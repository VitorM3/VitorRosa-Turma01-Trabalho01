const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");
const {log} = require('console')

describe('Testes da classe Gerenciador de Tarefas', () => {

    beforeEach(() => {
        taskManager = new GerenciadorDeTarefas()
    });

    test('Deve criar uma tarefa corretamente', () => {
        const task = {
            id: 1,
            concluida: false,
            descricao: 'Tarefa para Testes',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.buscarTarefaPorId(1)).toBe(task)
    })

    test('Deve ocorrer um erro ao criar ao adicionar uma tarefa por conta do tamanho da descrição', () => {
        const task = {
            id: 2,
            concluida: false,
            descricao: 'T',
            prioridade: 2,
            tags: ['Teste','Dev','Exemplo']
        }
        expect(()=>{
            taskManager.adicionarTarefa(task)
        }).toThrow('Erro ao cadastrar tarefa')
    })

    test('Deve remover uma tarefa corretamente', () => {
        const taskOriginal = {
            id: 2,
            concluida: false,
            descricao: 'Tarefa para Testes',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(taskOriginal)
        taskManager.removerTarefa(2)
        expect(taskManager.buscarTarefaPorId(2)).toBe(undefined)
    })

    test('Deve buscar uma tarefa através do ID corretamente', () => {
        const task = {
            id: 3,
            concluida: false,
            descricao: 'Tarefa para Testes',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.buscarTarefaPorId(3)).toBe(task)
    })

    test('Deve atualizar uma tarefa corretamente', () => {
        const taskOriginal = {
            id: 4,
            concluida: false,
            descricao: 'Tarefa para Testes',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(taskOriginal)

        const task = {
            id: 4,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.atualizarTarefa(4,task)
        expect(taskManager.buscarTarefaPorId(4)).toStrictEqual(task)
    })

    test('Deve listar as tarefas corretamente', () => {
        const task = {
            id: 5,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect( taskManager.listarTarefas()).toStrictEqual([task])
    })

    test('Deve contar as tarefas corretamente', () => {
        const task = {
            id: 6,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.contarTarefas()).toBe(1)
    })

    test('Deve marcar todas as tarefas como concluidas', () => {
        const task = {
            id: 7,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        taskManager.marcarTarefaComoConcluida(7)
        task.concluida = true;
        expect(taskManager.buscarTarefaPorId(7)).toBe(task)
    })

    test('Deve listar as tarefas concluidas', () => {
        const taskOne = {
            id: 8,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        const taskTwo = {
            id: 9,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.marcarTarefaComoConcluida(9)
        taskTwo.concluida = true;
        expect(taskManager.listarTarefasConcluidas()).toStrictEqual([taskTwo])
    })

    test('Deve listar as tarefas pendentes', () => {
        const taskOne = {
            id: 10,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        const taskTwo = {
            id: 11,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.marcarTarefaComoConcluida(10)
        expect(taskManager.listarTarefasPendentes()).toStrictEqual([taskTwo])
    })

    test('Deve remover as tarefas concluidas', () => {
        const taskOne = {
            id: 12,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        const taskTwo = {
            id: 13,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.marcarTarefaComoConcluida(10)
        taskManager.removerTarefasConcluidas()
        expect(taskManager.listarTarefasConcluidas()).toStrictEqual([])
    })

    test('Deve buscar uma tarefa pela descrição', () => {
        const task = {
            id: 14,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.buscarTarefaPorDescricao('Tarefa para Testes 02')).toStrictEqual([task])
    })

    test('Deve adicionar uma tag a tarefa', () => {
        const task = {
            id: 15,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        taskManager.adicionarTagATarefa(15,'Batata')
        task.tags.push('Batata')
        expect(taskManager.buscarTarefaPorId(15)).toStrictEqual(task)
    })

    test('Deve remover uma tag da tarefa', () => {
        const task = {
            id: 16,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        taskManager.removerTagDaTarefa(15,'Dev')
        task.tags = task.tags.filter((value)=> value != 'Dev')
        expect(taskManager.buscarTarefaPorId(16)).toStrictEqual(task)
    })

    test('Deve listar uma tarefa através da tag', () => {
        const task = {
            id: 17,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo']
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.listarTarefasPorTag('Dev')).toStrictEqual([task])
    })

    test('Deve buscar uma tarefa através da data', () => {
        const task = {
            id: 19,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.buscarTarefasPorData('04/09/2024')).toStrictEqual([task])
    })

    test('Deve atualizar a prioridade da tarefa', () => {
        const task = {
            id: 20,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(task)
        taskManager.atualizarPrioridade(20,3)
        task.prioridade = 3
        expect(taskManager.buscarTarefaPorId(20)).toStrictEqual(task)
    })

    test('Deve listar as tarefas através da prioridade', () => {
        const task = {
            id: 21,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.listarTarefasPorPrioridade(1)).toStrictEqual([task])
    })

    test('Deve contar as tarefas através da prioridade', () => {
        const task = {
            id: 22,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(task)
        expect(taskManager.contarTarefasPorPrioridade(1)).toBe(1)
    })

    test('Deve contar as tarefas através da prioridade', () => {
        const taskOne = {
            id: 23,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        const taskTwo = {
            id: 24,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.marcarTodasComoConcluidas()
        taskOne.concluida = true
        taskTwo.concluida = true
        expect(taskManager.listarTarefasConcluidas()).toStrictEqual([taskOne,taskTwo])
    })

    test('Deve contar as tarefas através da prioridade', () => {
        const task = {
            id: 25,
            concluida: true,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(task)
        taskManager.reabrirTarefa(25)
        task.concluida = false
        expect(taskManager.buscarTarefaPorId(25)).toBe(task)
    })

    test('Deve listar as tarefas ordenadas através da data', () => {
        const taskOne = {
            id: 23,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '05/09/2024'
        }
        const taskTwo = {
            id: 24,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.ordenarTarefasPorData()
        expect(taskManager.listarTarefas()).toStrictEqual([taskTwo,taskOne])
    })

    test('Deve listar as tarefas ordenadas através da prioridade', () => {
        const taskOne = {
            id: 23,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 5,
            tags: ['Teste','Dev','Exemplo'],
            data: '05/09/2024'
        }
        const taskTwo = {
            id: 24,
            concluida: false,
            descricao: 'Tarefa para Testes 02',
            prioridade: 1,
            tags: ['Teste','Dev','Exemplo'],
            data: '04/09/2024'
        }
        taskManager.adicionarTarefa(taskOne)
        taskManager.adicionarTarefa(taskTwo)
        taskManager.ordenarTarefasPorPrioridade()
        expect(taskManager.listarTarefas()).toStrictEqual([taskTwo,taskOne])
    })
 })