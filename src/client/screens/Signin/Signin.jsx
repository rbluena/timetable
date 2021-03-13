import Header from './Header';
import Form from './Form';
import Footer from './Footer';

const Signin = () => (
  <div className=" bg-neutral-50 h-screen ">
    <div className=" bg-white h-screen max-w-lg m-auto flex flex-col justify-center items-center overflow-hidden shadow-xl">
      <Header />
      <Form />
      <Footer />
    </div>
  </div>
);

export default Signin;
