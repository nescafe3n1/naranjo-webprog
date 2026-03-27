import Button from '../components/Button';

const AboutPage = () => (
  <div className="flex flex-col gap-10 p-8">
    <section className="bg-zinc-900 text-white rounded-[3rem] p-12 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tighter leading-none">Naranjoes</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          We believe that a website is only as strong as its foundation. Our team specializes in low-fidelity structural guides that ensure clarity and accessibility for every user.
        </p>
        <div className="flex gap-4">
          <Button to="/" variant="secondary" className="border-none">Back Home</Button>
          <Button to="/articles" variant="primary" className="border-white">View Methods</Button>
        </div>
      </div>
      <div className="relative aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-pulse"></div>
        <img src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-1/492318326_2490889827914105_4184761374167695101_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEKOBC__aq2yy01bDb6tRjxyMcizGycfevIxyLMbJx96xvuoE8VLlWkwB0_4I7h3OwWWXy4hqfQLA7d7eJ0_DoS&_nc_ohc=hYaY82xWp2kQ7kNvwEObNVL&_nc_oc=AdpJHo-mHOy1xMf2F8ZO5a4p4peCEoSN6VuAyGipAVm2H8YI3ZwCO7z5gSI38h1YIlM&_nc_zt=24&_nc_ht=scontent.fmnl25-4.fna&_nc_gid=NaiMdVe0HpO3nG6yyRkTGw&_nc_ss=7a3a8&oh=00_AfwthGy_DQpeT49XPdT50x64DT4pQdMNyzg_JbzPM1yUtw&oe=69CC3365" className="rounded-full w-full h-full object-cover grayscale border-4 border-white" alt="Team Lead" />
      </div>
    </section>
  </div>
);

export default AboutPage;