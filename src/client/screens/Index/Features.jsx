import { HiAnnotation, HiUserGroup, HiScale } from 'react-icons/hi';

const features = [
  {
    name: 'Collaboration',
    description:
      'You can collaborate with your team and organize team members into groups based on their roles.',
    icon: HiUserGroup,
  },
  {
    name: 'Kanban board',
    description:
      'We provide flexibility on naming titles and headings of different parts of UI components to meet the desire of your project.',
    icon: HiAnnotation,
  },
  {
    name: 'Project Access Control',
    description:
      'A project can be publicly accessed by anyone, or protected with a unique password for anyone with password to access it without registering. Access is granted to team members of the project only if project is private.',
    icon: HiScale,
  },
  {
    name: 'Message Board',
    description:
      'Directly from a project, a message board can be used to communicate with team members or public audience.',
    icon: HiAnnotation,
  },
  {
    name: 'Flexible titles and headings',
    description:
      'We provide flexibility on naming titles and headings of different parts of UI components to meet the desire of your project.',
    icon: HiAnnotation,
  },
  {
    name: 'Timeline/Agenda',
    description:
      'Timeline shows the schedules of your events in chronological order. Through filters and sortings events can be rendered differently.',
    icon: HiAnnotation,
  },
];
const Features = () => (
  <div className="my-12 py-12 bg-neutral-50 max-w-7xl mx-auto relative">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-xl text-primary-600 font-semibold tracking-wide uppercase">
          Features
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          What to expect from our platform
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                {/* <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div> */}
                <p className="ml-16 text-2xl font-bold leading-6 text-primary-600">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-neutral-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

export default Features;
