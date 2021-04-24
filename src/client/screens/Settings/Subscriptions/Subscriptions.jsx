const Subscriptions = () => (
  <div className="pt-4">
    <h2 className="text-3xl text-center text-primary-400 font-light">
      Subscriptions
    </h2>

    <p className="text-base font-normal text-neutral-400 text-center">
      Premium subscription is not available for now, all premium features are
      available for free.
      <span className="block">
        If it happens you enjoy using our product please support us by buying us
        couple cups of coffee.
      </span>
    </p>

    <div className="max-w-xs mx-auto mt-12">
      <a
        href="https://www.buymeacoffee.com/asteyo"
        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
      >
        Support
      </a>
    </div>
  </div>
);

export default Subscriptions;
