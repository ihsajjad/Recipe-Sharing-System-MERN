import { experiences, skills } from "../config/recipes.config";

const DevInfo = () => {
  return (
    <div className="max-container min-h-[60vh] flex flex-col items-center justify-center bg-[var(--secondary-bg)] py-6">
      <h3 className="text-3xl font-bold text-[var(--primary-color)] pb-1 px-2 border-y-2 border-double border-[var(--secondary-color)] w-fit mb-4 text-center">
        Dev Info
      </h3>
      <div className="w-full flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col items-center justify-center gap-3 flex-1">
          <img
            src="/sajjad.avif"
            alt=""
            className="w-[200px] h-[200px] rounded-full object-center border-2 border-[var(--secondary-color)] bg-[var(--primary-bg)]"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-600">
              MD Iftekher Hossen Sajjad
            </h2>
            <span>Honors 3rd Year (Economics)</span>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl text-[var(--secondary-color)] pb-1 border-b-2 border-[var(--secondary-color)] w-fit mb-4 text-center md:text-left">
            Experiences
          </h4>
          <div className="space-y-5 ">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="p-3 bg-[var(--primary-bg)] border border-[var(--secondary-color)] rounded shadow-md shadow-[#0000003c]"
              >
                <h3 className="text-lg font-semibold text-slate-600">
                  {experience.title} ({experience.type})
                </h3>
                <p>{experience.company}</p>
                <p className="text-sm text-slate-600">
                  {experience.range} ({experience.duration})
                </p>
                <p className="text-xs">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 ">
          <h4 className="text-xl text-[var(--secondary-color)] pb-1 border-b-2 border-[var(--secondary-color)] w-fit mb-4 text-center md:text-left">
            My Skills
          </h4>
          <div className="flex gap-3 flex-wrap ">
            {skills.map((skill) => (
              <button
                key={skill}
                className="bg-[var(--primary-bg)] px-2 py-1 rounded border border-[var(--secondary-color)]"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;
