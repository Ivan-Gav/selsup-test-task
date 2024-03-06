import { Component, useState } from "react";

type Color = string;

interface Param {
  id: number;
  name: string;
  type?: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

// Сейчас рекомендуется использовть функциональные компоненты,
// однако в задание вы уже вставили шаблон для класса, поэтому привожу 2 варианта

export function ParamEditorFunc(props: Props) {
  const { params, model } = props;
  const [values, setValues] = useState(model.paramValues);

  const getModel = () => {
    const newModel = { ...model };
    newModel.paramValues = values;
    return newModel;
  };

  if (!params.length) {
    return <h2>Parsms array is empty</h2>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(getModel());
      }}
    >
      {params.map((param) => {
        const { id } = param;
        const newValues = [...values];
        let index = newValues.findIndex((parVal) => parVal.paramId === id);
        
        if (index === -1) {
          // если в модели не найден нужный параметр, добавляем его (в задании не оговорено можно убрать)
          if (!param.type || param.type === "string") {
            index = newValues.length;
            newValues.push({ paramId: id, value: "" });
            setValues([{ paramId: id, value: "" }, ...values])
          } else {
            // обработать другие типы данных
          }
        }

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (index >= 0) {
            if (typeof values[index].value === "string") {
              newValues[index].value = e.target.value;
              setValues(newValues);
            } else {
              // обработать другие типы данных
            }
          }
        };

        return (
          <label key={param.id}>
            <span>{param.name}</span>
            <input
              type="text"
              value={values[index]?.value || ""}
              onChange={onChange}
            />
          </label>
        );
      })}
      <button>Get Model</button>
    </form>
  );
}

//-----------------------------------------------------------------------------------------

export default class ParamEditor extends Component<Props, State> {
  state = {
    model: this.props.model
  };

  componentDidMount(): void {
    this.setState({ model: this.props.model })

    this.props.params.map((param) => {
      const { id } = param;
        const newValues = [...this.state.model.paramValues];
        let index = newValues.findIndex((parVal) => parVal.paramId === id);
        
        if (index === -1) {
          // если в модели не найден нужный параметр, добавляем его (в задании не оговорено можно убрать)
          if (!param.type || param.type === "string") {
            index = newValues.length;
            newValues.push({ paramId: id, value: "" });
            const model = {...this.state.model};
            model.paramValues = newValues
            this.setState({model})
          } else {
            // обработать другие типы данных
          }
        }
    })

  }

  public getModel = () => {
    return this.state.model;
  };  
  
  render() {
   
    return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(this.getModel());
      }}
    >
      {this.props.params.map((param) => {
        const { id } = param;
        const newValues = [...this.state.model.paramValues];
        const index = newValues.findIndex((parVal) => parVal.paramId === id);
        
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (index >= 0) {
            if (typeof this.state.model.paramValues[index].value === "string") {
              newValues[index].value = e.target.value;
              const model = {...this.state.model};
              model.paramValues = newValues
              this.setState({model});
            } else {
              // обработать другие типы данных
            }
          }
        };

        return (
          <label key={param.id}>
            <span>{param.name}</span>
            <input
              type="text"
              value={this.state.model.paramValues[index]?.value || ""}
              onChange={onChange}
            />
          </label>
        );
      })}
      <button>Get Model</button>
    </form>
    );
  }
}
