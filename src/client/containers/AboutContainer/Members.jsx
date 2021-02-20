import { AvatarList } from '@app/components';

const Members = () => (
  <div className="flex flex-wrap items-center">
    <AvatarList
      images={[
        { initials: 'RL' },
        {
          src:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          alt: 'Rabii Luena',
        },
        { initials: 'AL' },
      ]}
      size="lg"
    />

    {/* <div className="flex ml-4">
      <Text
        text="Organizers"
        variant="primary"
        type="subheading"
        className="font-bold"
      />
      &nbsp; &nbsp;
      <Text
        type="subheading"
        variant="neutral"
        text="3"
        className="font-bold"
      />
    </div> */}
  </div>
);

export default Members;
