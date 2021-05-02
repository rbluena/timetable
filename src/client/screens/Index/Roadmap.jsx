import {
  HiCalendar,
  HiClipboardCheck,
  HiClock,
  HiPaperClip,
  HiOutlineChartBar,
  HiTemplate,
} from 'react-icons/hi';

const features = [
  {
    name: 'Calendar',
    description:
      'Currently you can view schedules in timeline/agenda, but we are about to launch calendar view anytime soon.',
    icon: HiCalendar,
  },
  {
    name: 'Time tracker',
    description:
      'If you would like to track amount of time used on a task, just bear with us you will soon be able to do that.',
    icon: HiClock,
  },
  {
    name: 'Checklist',
    description: 'You will be able to create and clear checklists.',
    icon: HiClipboardCheck,
  },
  {
    name: 'Attachments',
    description:
      'Our highest priorities are set to attaching files to a task and task conversation through comments.',
    icon: HiPaperClip,
  },
  {
    name: 'Analytics',
    description:
      'Analytical data on how team members do well with their tasks and time.',
    icon: HiOutlineChartBar,
  },
  {
    name: 'Templates',
    description:
      'Capability to build community templates for anyone to quick start a project.',
    icon: HiTemplate,
  },
];
const Roadmap = () => (
  <div className="my-12 py-12 bg-neutral-50 max-w-7xl mx-auto relative">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-xl text-primary-600 font-semibold tracking-wide uppercase">
          Roadmap
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Stay tuned for upcoming good stuff
        </p>
        {/* <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
          What to expect from our platform.
        </p> */}
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-neutral-900">
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

export default Roadmap;
