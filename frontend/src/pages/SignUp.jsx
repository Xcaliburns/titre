import { useState } from "react";
import { useNavigate } from "react-router-dom";

import callAPI from "../Services/CallAPI";
import * as yup from "yup";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameUnavailable, setNameunavailable] = useState(false);
  const [emailUnavailable, setEmailUnavailable] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const usedName = () => {
    return new Promise((resolve, reject) => {
      callAPI
        .get("/api/user")
        .then((res) => {
          const isNameUnavailable = res.data.some((user) => user.name === name);
          const isEmailUnavailable = res.data.some(
            (user) => user.email === email
          );
          setNameunavailable(isNameUnavailable);
          setEmailUnavailable(isEmailUnavailable);

          resolve({
            isNameUnavailable: isNameUnavailable,
            isEmailUnavailable: isEmailUnavailable,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const validationSchema = yup.object({
    name: yup.string().required("Le Pseudo est obligatoire"),
    email: yup
      .string()
      .email("Format d'email invalide")
      .required("L'email est obligatoire"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /[!@#$%^*(),.\-+|<>]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      )
      .required("Le mot de passe est obligatoire"),
  });

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const { isNameUnavailable, isEmailUnavailable } = await usedName();

      console.log(isNameUnavailable);
      console.log(isEmailUnavailable);

      if (!isNameUnavailable && !isEmailUnavailable) {
        await validationSchema.validate(
          { name, email, password },
          { abortEarly: false }
        );

        callAPI
          .post("/api/user", { email, password, name })
          .then(() => navigate("/login"))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
    }
  };

  return (
    <div className="flex flex-col min-h-full items-center bg-slate-500">
      <form
        onSubmit={handleForm}
        className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-800 shadow-xl border-solid sm:max-w-md sm:rounded-lg"
      >
        <div className="flex flex-col my-10">
          <label htmlFor="name" className="w-1/3 text-xl text-gray-100">
            Pseudo
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="pseudo"
          />
          {validationErrors.pseudo && (
            <p className="text-red-500 text-sm">{validationErrors.pseudo}</p>
          )}
          {nameUnavailable && (
            <p className="text-red-500 text-sm">Ce pseudo est indisponible</p>
          )}
        </div>
        <div className="flex flex-col my-10">
          <label htmlFor="email" className="w-1/3 text-xl text-gray-100">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="email"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email}</p>
          )}
          {emailUnavailable && (
            <p className="text-red-500 text-sm">Cet email est indisponible</p>
          )}
        </div>
        <div className="flex flex-col my-10">
          <label htmlFor="password" className="w-1/3 text-xl text-gray-100">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded mr-10 h-10 w-250 text-xl"
            id="password"
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm">{validationErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 ml-1 text-xs font-semibold tracking-widest text-gray-100 uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false hover:bg-green-500"
        >
          Inscription
        </button>
      </form>
    </div>
  );
}

export default SignUp;
