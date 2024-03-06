import {ParamEditorFunc} from "./ParamEditor";

const params = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
  {
    id: 3,
    name: "Размер",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
  colors: ["red", "#ffffff"],
};

function App() {
  return (
    <>
      <ParamEditorFunc params={params} model={model} />
    </>
  );
}

export default App;
