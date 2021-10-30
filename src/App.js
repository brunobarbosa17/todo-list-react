import fundo from './assets/background.jpg'
import { useState } from 'react';

function Tarefa(props) {
  return (
    <>
    <li>
      <span
        onClick={() => props.handleComplete(props.id)}
        style={{ textDecoration: props.completa ? 'line-through' : '', 
        color: props.completa ? '#D1D2DA' : 'black'  }}>
        {props.children}
      </span>
      <button onClick={() => props.handleDelete(props.id)}>X</button>
    </li>
    <div className="linha"></div>
      </>
  )
}


function App() {


  
  
  const [todas, setTodas] = useState(true);
  const [ativas, setAtivas] = useState(false);
  const [completadas, setCompletadas] = useState(false);


  const [tarefas, setTarefas] = useState([]);
  const [tarefasAll, setTarefasAll] = useState([]);

  function handleKeyDown(event) {
    if (event.key !== 'Enter' || event.target.value == '') return;

    const novasTarefas = [...tarefasAll, {id: Math.random(), texto: event.target.value, completa: false}]
    setTarefasAll(novasTarefas);
    setTarefas(novasTarefas);
    event.target.value = '';
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter( (tarefa) => {
      return tarefa.id !== id;
    });

    setTarefasAll(novasTarefas)
    setTarefas(novasTarefas)
  }

  function handleComplete(id) {
    const novasTarefas = [...tarefas]
    const tarefaCompletada = novasTarefas.find(function (tarefa) {
      return tarefa.id === id;
    });

    tarefaCompletada.completa = !tarefaCompletada.completa;
    
    setTarefasAll(novasTarefas)
    setTarefas(novasTarefas)

  }

  function tarefasCompletadas() {
    const tarefasCompletas = tarefasAll.filter(task => {
      return task.completa === true;
    });

    setAtivas(false)
    setTodas(false)

    setCompletadas(true)
    setTarefas( tarefasCompletas )
  }


  function tarefasTodas() {


    setAtivas(false)
    setCompletadas(false)
    setTodas(true)
    setTarefas( tarefasAll )
  }

  function tarefasAtivas() {
    const tarefasAtivas = tarefasAll.filter(task => {
      return task.completa !== true;
    });

    setTodas(false)
    setCompletadas(false)
    setAtivas(true)

    setTarefas( tarefasAtivas )
  }

  function limparCompletadas() {
    const tarefasCompletas = tarefasAll.filter(task => {
      return task.completa === false;
    });

    
    setTarefasAll(tarefasCompletas)
    setTarefas(tarefasCompletas)
  }



  return (
    <div className="App">
      <header>
        <img src={fundo} />
      </header>

      <main className="container">
        <h1>TAREFAS</h1>
        <input type="text" onKeyDown={handleKeyDown} placeholder="Criar uma nova tarefa"/>
        
        <div className="tarefas">
          <ul>
            {tarefas.map(function (tarefa) {
              return (
                <Tarefa key={tarefa.id}
                id={tarefa.id}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                completa={tarefa.completa}
                > 
                  {tarefa.texto}
                </Tarefa>
                )
            })}
          </ul>

          <footer>
          <span>{tarefas.length} items restantes</span>
          <div className="three">
          <span onClick={tarefasTodas} style={{ color: todas ? '#3A7CFD' : '#9495A5' }} className="three-span">Todas</span>
          <span onClick={tarefasAtivas} style={{ color: ativas ? '#3A7CFD' : '#9495A5' }} className="three-span">Ativas</span>
          <span onClick={tarefasCompletadas} style={{ color: completadas ? '#3A7CFD' : '#9495A5' }} className="three-span" >Completadas</span>
          </div>
          <span onClick={limparCompletadas} className="limpar-completadas" >Limpar Completadas</span>
          </footer>
        </div>
      </main>

    </div>
  );
}

export default App;
