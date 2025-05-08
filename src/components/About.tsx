export default function About() {
    const education = [
      {
        degree: "BTech in Computer Science (Cloud Computing)",
        school: "University of Petroleum and Energy Studies",
        year: "2022 – 2026"
      }
    ];
  
    const skills = ["AWS Cloud", "Docker", "Kubernetes", "React", "JavaScript"];
  
    return (
      <section id="about" className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="max-w-2xl mb-6">
          Final-year BTech student specializing in Cloud Computing. Experienced with 
          AWS, Docker, Kubernetes, and modern web development.
        </p>
  
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        {education.map((edu, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium">{edu.degree}</p>
            <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
          </div>
        ))}
  
        <h3 className="text-xl font-semibold mt-6 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  }