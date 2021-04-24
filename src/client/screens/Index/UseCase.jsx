import { HiAcademicCap, HiChartPie, HiCake, HiBriefcase } from 'react-icons/hi';

const features = [
  {
    name: 'Education',
    description: 'Create schedules and tasks for classes or homeworks.',
    icon: HiAcademicCap,
  },
  {
    name: 'Event planning',
    description:
      'Share your activities plan for your wedding ceremony, funeral service or any event with your audience.',
    icon: HiCake,
  },
  {
    name: 'Marketing',
    description:
      'Plan and track your social media and SEO marketing strategies.',
    icon: HiChartPie,
  },
  {
    name: 'Project management',
    description:
      'Create a killer project plan that will optimize your workflow.',
    icon: HiBriefcase,
  },
];
const UseCases = () => (
  <div className="bg-white border-t border-b border-primary-100">
    <div className="my-12 py-12 max-w-7xl mx-auto relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl text-primary-600 font-semibold tracking-wide uppercase">
            Use Cases
          </h2>
          {/* <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to send money
        </p> */}
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
            There are many ways to use our platform, use cases are including but
            not limited to.
          </p>
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
  </div>
);

export default UseCases;
