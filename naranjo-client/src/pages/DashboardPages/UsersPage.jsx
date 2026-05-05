import { useState, useRef } from 'react';
import {
    Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel, IconButton, InputAdornment, MenuItem, Paper, Stack, Switch,
    TextField, Typography, useMediaQuery, Card, CardContent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../assets/data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '', lastName: '', age: '', gender: '', contactNumber: '',
    email: '', role: 'editor', username: '', password: '', address: '', isActive: true,
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase()) ? String(user.gender ?? '').trim().toLowerCase() : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase()) ? String(user.role ?? '').trim().toLowerCase() : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return { users: [], error: 'Unable to read users from src/assets/users.json.' };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const printRef = useRef(null);
    const [users, setUsers] = useState(seed.users);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ role: '', gender: '', status: '' });

    // Filter logic - search and filter users
    const filteredUsers = users.filter((user) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.username.toLowerCase().includes(searchLower);

        const matchesRole = !filters.role || user.role === filters.role;
        const matchesGender = !filters.gender || user.gender === filters.gender;
        const matchesStatus = !filters.status || 
            (filters.status === 'active' ? user.isActive : !user.isActive);

        return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    // PDF Print Handler
    const handlePrintPDF = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        ).map((node) => node.outerHTML).join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Users Report</title>
                ${headMarkup}
                <style>
                    @page { size: A4; margin: 16mm; }
                    * { box-sizing: border-box; }
                    body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1f2937; }
                    .report-shell { padding: 28px; }
                    .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #d1d5db; }
                    .report-header h1 { margin: 0 0 6px; font-size: 28px; font-weight: 700; }
                    .report-header p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }
                    .report-content { margin-top: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th, td { padding: 10px; text-align: left; border: 1px solid #d1d5db; }
                    th { background-color: #f3f4f6; font-weight: 600; }
                    tr:nth-child(even) { background-color: #f9fafb; }
                </style>
            </head>
            <body>
                <main class="report-shell">
                    <header class="report-header">
                        <h1>Users Report</h1>
                        <p>Complete list of all users in the system with their details and status information.</p>
                        <p>Prepared on ${exportedAt}</p>
                    </header>
                    <section class="report-content">
                        ${printContent.outerHTML}
                    </section>
                </main>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const toggleStatus = (id) => {
        setUsers((prev) => prev.map((user) => user.id === id ? { ...user, isActive: !user.isActive } : user));
    };

    const resetForm = () => { setForm({ ...blankForm }); setErrors({}); };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => { setModal({ open: false, id: null }); setShowPassword(false); resetForm(); };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) { setErrors((prev) => ({ ...prev, [name]: '' })); }
    };

    const handleFilterChange = ({ target: { name, value } }) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const fieldProps = (name, label, extra = {}) => ({
        name, label, value: form[name], onChange: handleChange,
        error: Boolean(errors[name]), helperText: errors[name],
        fullWidth: true, ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        {
            field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 170,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 150 },
        { field: 'age', headerName: 'Age', width: 90 },
        {
            field: 'gender', headerName: 'Gender', minWidth: 110,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
        {
            field: 'role', headerName: 'Role', minWidth: 120,
            valueGetter: (_, row) => labelize(row.role),
        },
        {
            field: 'status', headerName: 'Status', width: 120, sortable: false,
            renderCell: ({ row }) => (
                <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'default'}
                    variant={row.isActive ? 'filled' : 'outlined'} />
            )
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 220, sortable: false, filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button size="small" variant="outlined" onClick={() => openModal(row)}>Edit</Button>
                    <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} onClick={() => toggleStatus(row.id)}>
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
            )
        },
    ];

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();
        
        [
            ['firstName', 'First name'], ['lastName', 'Last name'], ['age', 'Age'],
            ['gender', 'Gender'], ['contactNumber', 'Contact number'], ['email', 'Email'],
            ['role', 'Role'], ['username', 'Username'], ['password', 'Password'], ['address', 'Address'],
        ].forEach(([key, label]) => { if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`; });

        // Email validation
        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
        if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) nextErrors.email = 'Email address already exists.';
        
        // Username validation - must not contain spaces
        if (!nextErrors.username && /\s/.test(form.username)) nextErrors.username = 'Username must not contain spaces.';
        if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) nextErrors.username = 'Username already exists.';
        
        // Password validation - at least 8 characters
        if (!nextErrors.password && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
        
        // Contact number validation - must be 11 digits
        const contactNumberDigits = form.contactNumber.replace(/\D/g, '');
        if (!nextErrors.contactNumber && contactNumberDigits.length !== 11) nextErrors.contactNumber = 'Contact number must be 11 digits.';
        
        // Age validation - must be a number
        if (!nextErrors.age && isNaN(Number(form.age))) nextErrors.age = 'Age must be a number.';
        
        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
        const nextUser = { ...form, email: form.email.trim().toLowerCase(), username: form.username.trim().toLowerCase() };
        setUsers((prev) => modal.id ? prev.map((u) => u.id === modal.id ? { ...u, ...nextUser } : u) : [...prev, { id: prev.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1, ...nextUser }]);
        closeModal();
    };

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h4">Users</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <Button variant="contained" onClick={() => openModal()} sx={{ flex: { xs: 1, sm: 'auto' } }}>Add User</Button>
                    <Button variant="outlined" onClick={handlePrintPDF} sx={{ flex: { xs: 1, sm: 'auto' } }}>Export PDF</Button>
                </Stack>
            </Box>

            {/* Search and Filter Section */}
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
                <Stack spacing={2}>
                    <TextField
                        placeholder="Search by first name, last name, email, or username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            label="Filter by Role"
                            name="role"
                            value={filters.role}
                            onChange={handleFilterChange}
                            sx={{ flex: 1 }}
                            size="small"
                        >
                            <MenuItem value="">All Roles</MenuItem>
                            {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                        </TextField>
                        <TextField
                            select
                            label="Filter by Gender"
                            name="gender"
                            value={filters.gender}
                            onChange={handleFilterChange}
                            sx={{ flex: 1 }}
                            size="small"
                        >
                            <MenuItem value="">All Genders</MenuItem>
                            {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                        </TextField>
                        <TextField
                            select
                            label="Filter by Status"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            sx={{ flex: 1 }}
                            size="small"
                        >
                            <MenuItem value="">All Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                        <Button 
                            variant="outlined" 
                            onClick={() => { setSearchQuery(''); setFilters({ role: '', gender: '', status: '' }); }}
                            sx={{ flex: 1 }}
                            size="small"
                        >
                            Clear Filters
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            {seed.error && <Alert severity="error" sx={{ mb: 2 }}>{seed.error}</Alert>}
            <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
                {filteredUsers.length ? (
                    <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
                        <DataGrid rows={filteredUsers} columns={columns} disableRowSelectionOnClick pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }} sx={{ minWidth: 0, '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' } }} />
                    </Box>
                ) : <Alert severity="info">No users found. Try adjusting your search or filters.</Alert>}
            </Paper>

            {/* Hidden Print Section */}
            <Box ref={printRef} sx={{ display: 'none' }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Contact Number</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{labelize(user.role)}</td>
                                <td>{labelize(user.gender)}</td>
                                <td>{user.age}</td>
                                <td>{user.contactNumber}</td>
                                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
                    <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name')} />
                                <TextField {...fieldProps('lastName', 'Last Name')} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('age', 'Age')} helperText={errors.age || 'Must be a number'} />
                                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                    {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('contactNumber', 'Contact Number')} helperText={errors.contactNumber || 'Must be 11 digits'} />
                                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('role', 'Role', { select: true })}>
                                    {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                                </TextField>
                                <TextField {...fieldProps('username', 'Username')} helperText={errors.username || 'No spaces allowed'} />
                            </Stack>
                            <TextField {...fieldProps('password', 'Password', { type: showPassword ? 'text' : 'password', helperText: errors.password || 'Minimum 8 characters', InputProps: { endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ) } })} />
                            <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
                            <FormControlLabel control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />} label={form.isActive ? 'User status: Active' : 'User status: Inactive'} />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="contained">{modal.id ? 'Update User' : 'Save User'}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;