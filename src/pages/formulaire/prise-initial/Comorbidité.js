import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/FormikControl";

import NavTop from "../../../components/NavTop";
import Title from "../../../components/Inscreptiontitle";
import Horibar from "../../../components/Horibar";
import VertiBar from "../../../components/VertiBar";
import NextButton from "../../../components/NextButton";

export default function Comorbidité() {
  const initialValues = {
    antecedent: [],
    evenementHemoragiqueMajeur: [],
    cancer: [],
    pathologieVasculaire: [],
  };
  const validationSchema = Yup.object({
    antecedent: Yup.array().required(),
    evenementHemoragiqueMajeur: Yup.array().required(),
    cancer: Yup.array().required(),
    pathologieVasculaire: Yup.array().required(),
  });

  const onSubmit = (values) => console.log(values);

  const antecendentOptions = [
    { key: "Antécédent d'AVC/AIT/Hombolie systémique", value: "antecedent" },
  ];
  const evenmentOptions = [
    {
      key: "Evènement Hémoragique Majeur",
      value: "EvenementHemoragiqueMajeur",
    },
  ];
  const cancerOptions = [{ key: "Cancer", value: "cancer" }];
  const pathologieOptions = [
    { key: "Pathologie Vasculaire", value: "pathologieVasculaire" },
  ];
  return (
    <StyledDiv>
      <NavTop />
      <Title />
      <Horibar />
      <div className="form-container">
        <VertiBar />
        <div className="form">
          <h1>Comorbidité</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <FormikControl
                  control="checkbox"
                  name="antecedent"
                  options={antecendentOptions}
                />
                <FormikControl
                  control="checkbox"
                  name="evenementHemoragiqueMajeur"
                  options={evenmentOptions}
                />
                <FormikControl
                  control="checkbox"
                  name="cancer"
                  options={cancerOptions}
                />
                <FormikControl
                  control="checkbox"
                  name="pathologieVasculaire"
                  options={pathologieOptions}
                />

                <div className="button-container">
                  <NextButton />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 80vw;

  height: 100vh;
  /* .formControl {
    margin-bottom: 20px;
  } */

  .form-container {
    display: flex;
    flex-direction: row;
    .form {
      min-height: 70vh;
      width: 55vw;
      position: relative;
      h1 {
        color: #243153;
        margin: 1rem 2rem;
      }
      .button-container {
        width: 45vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 1.5rem 0rem;
      }
    }
  }
`;
