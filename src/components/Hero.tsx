export default function Hero() {
    return (
      <section className="min-h-screen flex flex-col justify-center px-8">
        <h1 className="text-4xl font-bold">Hi, I'm Manav Adwani</h1>
        <p className="mt-4 text-xl">Cloud & DevOps Engineer | Developer</p>
        <div className="mt-6">
          <a href="/projects" className="mr-4 underline">View Projects</a>
          <a href="#contact" className="underline">Contact Me</a>
        </div>
      </section>
    );
  }