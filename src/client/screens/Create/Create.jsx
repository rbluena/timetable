import CreateForm from './CreateForm';

const Create = () => (
  <div className="w-full">
    <h2 className="text-3xl font-light text-center text-primary-400 py-8">
      Create project
    </h2>
    <div className="bg-white mx-auto max-w-md mt-4 shadow-sm rounded p-4">
      <CreateForm />
    </div>
  </div>
);

export default Create;
