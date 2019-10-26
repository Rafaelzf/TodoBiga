import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tarefas: [],
      inputTarefa: ""
    };

    this.addTarefa = e => {
      e.preventDefault();

      const tarefas = this.state.tarefas.slice();
      tarefas.push(this.state.inputTarefa);

      this.setState({
        tarefas: tarefas,
        inputTarefa: ""
      });
    };

    this.onChange = e => {
      e.preventDefault();

      const state = Object.assign({}, this.state);
      state[e.target.name] = e.target.value;
      this.setState(state);
    };

    this.removeTarefas = index => {
      const tarefas = this.state.tarefas.slice();

      tarefas.splice(index, 1);

      this.setState({
        tarefas: tarefas
      });
    };

    this.alterarTarefa = (index, valor) => {
      const tarefas = this.state.tarefas.slice();
      tarefas[index] = valor;

      this.setState({
        tarefas: tarefas
      });
    };
  }

  render() {
    return (
      <Renderizador
        tarefas={this.state.tarefas}
        inputTarefa={this.state.inputTarefa}
        onChange={this.onChange}
        addTarefa={this.addTarefa}
        remove={this.removeTarefas}
        alterarTarefa={this.alterarTarefa}
      />
    );
  }
}

class ListaViewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      texto: props.tarefa
    };

    this.removeTarefa = () => {
      this.props.remove(this.props.index);
    };

    this.alterarTarefa = () => {
      this.props.alterarTarefa(this.props.index, this.state.texto);
      this.setState({
        edit: false
      });
    };

    this.abrirForm = () => {
      this.setState({ edit: true });
    };

    this.fecharForm = () => {
      this.setState({ edit: false });
    };

    this.onChange = ev => {
      this.setState({
        texto: ev.target.value
      });
    };
  }

  render() {
    if (!this.state.edit) {
      return (
        <div className="input-group mb-3" key={this.props.index}>
          <input
            className="form-control"
            type="text"
            placeholder={this.props.tarefa}
            readonly="readonly"
          />
          <div className="input-group-append">
            <button
              className="btn btn-danger"
              onClick={this.removeTarefa}
              type="button"
            >
              Excluir
            </button>
            <button
              className="btn btn-warning"
              onClick={this.abrirForm}
              type="button"
            >
              Alterar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="input-group mb-3" key={this.props.index}>
        <input
          type="text"
          className="form-control"
          placeholder={this.props.texto}
          value={this.state.texto}
          onChange={this.onChange}
        />

        <div className="input-group-append">
          <button
            className="btn btn-success"
            onClick={this.alterarTarefa}
            type="button"
          >
            Salvar
          </button>
          <button
            className="btn btn-secondary"
            onClick={this.fecharForm}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }
}

const Renderizador = props => {
  return (
    <main className="container">
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
        <h5 className="mb-0 text-white lh-100">Lista de Tarefas</h5>&nbsp; -
        &nbsp;<i>Todobiga</i>
      </div>
      <hr className="my-4" />

      <div className="input-group mb-4">
        <input
          name="inputTarefa"
          type="text"
          value={props.inputTarefa}
          onChange={props.onChange}
          className="form-control"
          placeholder="Tarefa"
        />

        <div className="input-group-append">
          <button className="btn btn-primary" onClick={props.addTarefa}>
            Inserir
          </button>
        </div>
      </div>

      {props.tarefas.map((tarefa, index) => (
        <ListaViewItem
          tarefa={tarefa}
          index={index}
          remove={props.remove}
          alterarTarefa={props.alterarTarefa}
        />
      ))}
    </main>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
