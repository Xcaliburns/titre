import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xknlbpbv");

  if (state.succeeded) {
    return <p className=" flex justify-center items-center h-screen text-gray-500 text-xl">Merci pour votre message</p>;
  }

  return (
    <div className='mt-10'>
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-xl md:w-2/3 lg:w-1/2 mx-auto">
      <div className="mb-4">
        <label htmlFor="prenom" className="block text-sm font-medium text-gray-400">
          Prénom :
        </label>
        <input
          id="prenom"
          type="text"
          name="prenom"
          className="block w-full rounded-md bg-gray-700 text-gray-100 px-3 py-2"
          required
        />
        <ValidationError prefix="Prénom" field="prenom" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="nom" className="block text-sm font-medium text-gray-400">
          Nom :
        </label>
        <input
          id="nom"
          type="text"
          name="nom"
          className="block w-full rounded-md bg-gray-700 text-gray-100 px-3 py-2"
          required
        />
        <ValidationError prefix="Nom" field="nom" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="site" className="block text-sm font-medium text-gray-400">
          Site :
        </label>
        <input
          id="site"
          type="text"
          name="site"
          className="block w-full rounded-md bg-gray-700 text-gray-100 px-3 py-2"
        />
        <ValidationError prefix="Site" field="site" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email :
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="block w-full rounded-md bg-gray-700 text-gray-100 px-3 py-2"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-400">
          Message :
        </label>
        <textarea
          id="message"
          name="message"
          className="block w-full md:w-2/3 lg:w-full rounded-md bg-gray-700 text-gray-100 px-3 py-2 resize-none"
          required
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-gray-900 text-gray-100 hover:bg-green-500 rounded-md px-4 py-2 text-sm font-semibold uppercase transition duration-150 ease-in-out"
      >
        Envoyer
      </button>
    </form>
    </div>
  );
}

export default ContactForm;
