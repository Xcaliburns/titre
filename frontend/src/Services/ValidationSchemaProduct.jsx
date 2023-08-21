import * as yup from "yup";

const ValidationSchemaProduct = yup.object().shape({
  shortDescription: yup.string().required("Le résumé est requis"),
  description: yup.string().required("La description est requise"),
  price: yup
    .number()
    .required("Le prix est requis")
    price: yup
    .number()
    .required("Le prix est requis")
    .test("is-positive-number", "Le prix doit être un nombre positif avec au plus 2 décimales", (value) => {
      if (!value) return false; // Handles the required case
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  photo: yup.string().required("La photo est requise"),
  title: yup.string().required("Le titre est requis"),
  studio: yup.string().required("Le studio est requis"),
  genre: yup.string().required("Le genre est requis"),
  release: yup.string().required("La date de sortie est requise"),
});

export default ValidationSchemaProduct;

