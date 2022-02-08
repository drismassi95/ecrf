import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import {
  auth,
  addingInformationsPatient,
} from "../../../firebase/firebase.utils";

import NavTop from "../../../components/NavTop";
import Title from "../../../components/Inscreptiontitle";
import Horibar from "../../../components/Horibar";
import VertiBar from "../../../components/Vertibar3";
import NextButton from "../../../components/NextButton";

export default function TraitementAntiThrombotique() {
  const navigate = useNavigate();
  const initialValues = {
    traitement: [],
    traitementOption1: [],
    traitementOption2: [],
    anticoagulantOral: "",
    antiagrégantPlaquettaire: "",
  };
  const validationSchema = Yup.object({
    traitement: Yup.array().required("ce champs est obligatoire"),
    traitementOption1: Yup.array().required("ce champs est obligatoire"),
    traitementOption2: Yup.array().required("ce champs est obligatoire"),
    anticoagulantOral: Yup.string(
      "ce champs doit être alpahnumiérique"
    ).required("ce champs est obligatoire"),
    antiagrégantPlaquettaire: Yup.string(
      "ce champs doit être alpahnumiérique"
    ).required("ce champs est obligatoire"),
  });

  const param = useParams();
  const onSubmit = (values) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      await addingInformationsPatient(user, param, values);
      navigate(`/traitementDeLaFA/${param.idpatient}`);
    });
    return unsubscribe;
  };
  const traitementOptions = [
    {
      key: "Le patient suit un traitement antithrombotique",
      value: "traitement",
    },
  ];
  const traitementOptionOptions1 = [
    {
      key: "Anticoagulant oral",
      value: "anticoagulantOral",
    },
  ];
  const traitementRadioOptions1 = [
    {
      key: "Acenocoumarol",
      value: "acenocoumarol",
    },
    {
      key: "Fluindione",
      value: "fluindione",
    },
    {
      key: "Rivaroxaban",
      value: "rivaroxaban",
    },
    {
      key: "Dabigatran",
      value: "dabigatran",
    },
    {
      key: "Apixaban",
      value: "apixaban",
    },
    {
      key: "Edoxaban",
      value: "edoxaban",
    },
  ];
  const traitementOptionOptions2 = [
    {
      key: "Antiagrégant plaquettaire",
      value: "antiagrégantPlaquettaire",
    },
  ];
  const traitementRadioOptions2 = [
    {
      key: "Aspirine",
      value: "aspirine",
    },
    {
      key: "Clopidogrel",
      value: "clopidogrel",
    },
  ];

  return (
    <StyledDiv>
      <NavTop />
      <Title title="inscription d'un patient" />
      <Horibar number={3} />
      <div className="form-container">
        <VertiBar number={1} />
        <div className="form">
          <h1>Traitement Antithrombotique</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <div>
                  <FormikControl
                    control="checkbox"
                    name="traitement"
                    options={traitementOptions}
                  />
                  {formik.values.traitement.length !== 0 ? (
                    <div className="child">
                      <div className="field">
                        <FormikControl
                          control="checkbox"
                          name="traitementOption1"
                          options={traitementOptionOptions1}
                        />
                        {formik.values.traitementOption1.length !== 0 ? (
                          <FormikControl
                            control="radio"
                            name="anticoagulantOral"
                            options={traitementRadioOptions1}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="field">
                        <FormikControl
                          control="checkbox"
                          name="traitementOption2"
                          options={traitementOptionOptions2}
                        />
                        {formik.values.traitementOption2.length !== 0 ? (
                          <FormikControl
                            control="radio"
                            name="antiagrégantPlaquettaire"
                            options={traitementRadioOptions2}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

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
      .child {
        margin-left: 2rem;
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