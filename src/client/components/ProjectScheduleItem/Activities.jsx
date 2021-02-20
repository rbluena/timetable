import { Text } from '@app/components';

const Activities = ({ activities }) => (
  <div className="pl-2">
    {activities.map((item) => (
      <div className="relative">
        <div className=" absolute h-full border-r-2 border-neutral-300" />

        <div className="flex items-center">
          <input type="radio" />
          <div className="pl-4">
            <Text text={item.title} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Activities;
