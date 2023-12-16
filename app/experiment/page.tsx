"use client" // Client-side Component to allow for state changes and routing.

import Layout from "../layout"
import Instructions from "./instructions"
import ActionButton from "../_components/buttons/actionButton"
import ArrayElement from "../_components/buttons/arrayElements"
import { useEffect, useState } from "react"
import API from "../api"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"

// Selection Sort State Interface.
interface SelectionSortState {
  array: number[],
  i: number,
  max: number,
  b: number,
}

// API Function Calls

/**
 * API call to create a run for a userId and set the runId.
 * @param userId The userId of the user.
 * @param setRunId Function to set the runId.
 */
const createRun = async (userId: string, setRunId: React.Dispatch<React.SetStateAction<string>>) => {
  console.log("Creating runId.")
  // API call.
  await API
    .post(
      `/createRun`, JSON.stringify({
        id: userId,
        machineId: "selectionSort",
      })
    )
    .then((response: any) => {
      // Set the runId.
      setRunId(response.data.id)
    })
    .catch((error: any) => {
      console.log(error)
    })
}

/**
 * API call to update the Run parameters.
 * @param payload Payload for the API.
 * @param runId The runId of the current run.
 * @param type The action performed.
 * @param preState The state before the action.
 * @param postState The state after the action.
 */
const updateRun = async (
  payload: any,
  runId: string,
  type: string,
  preState: SelectionSortState,
  postState: SelectionSortState
) => {
  // If runId is undefined, then the user has not been initialised
  if (runId === "") {
    return
  }
  // Log the current state into the browser console.
  console.log(JSON.stringify({
    id: runId,
    payload: payload === undefined ? {} : payload,
    type: type,
    preState: preState === undefined ? {} : preState,
    postState: postState === undefined ? {} : postState,
    timestamp: Date.now()
  }))
  // API call.
  await API
    .post(
      `/updateRun`, JSON.stringify({
        id: runId,
        payload: payload === undefined ? {} : payload,
        type: type,
        preState: preState === undefined ? {} : preState,
        postState: postState === undefined ? {} : postState,
        timestamp: Date.now()
      })
    )
    .then(response => {
      console.log(response)
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * API call to update that the run is completed.
 * @param id The userId of the user of the current run.
 */
const complete = async (id: string, setCompleted: React.Dispatch<React.SetStateAction<boolean>>) => {
  let final = `/complete/` + id
  // API call.
  await API
    .get(final)
    .then(response => {
      console.log(response)
      console.log(response.data)
      setCompleted(true)
      // window.alert("Thank you for your participation.")
    })
    .catch(error => {
      console.log(error)
    })
}

// List of Actions
const Action = Object.freeze({
  Init: 'Init',
  Undo: 'Undo',
  Redo: 'Redo',
  Reset: 'Reset',
  Submit: 'Submit',
  CancelSubmit: 'CancelSubmit',
  ConfirmSubmit: 'ConfirmSubmit',
  Increment: 'Increment',
  UpdateMax: 'UpdateMax',
  SwapMax: 'SwapMax',
  DecrementAndReset: 'DecrementAndReset',
})

// List of Prompts
const Prompts = Object.freeze({
  Init: "Experiment Initialised.",
  Undo: "Undo successful.",
  Redo: "Redo successful.",
  Reset: "Experiment reset to initial state.",
  Submit: "Confirm submission?",
  CancelSubmit: "Submission cancelled.",
  ConfirmSubmit: "Submission confirmed!",
  Increment: "Value of 'i' increased by 1.",
  IncrementFail: "Value of 'i' cannot be increased anymore.",
  UpdateMax: "Value of 'max' updated.",
  SwapMax: "Swapped the 'max' and boundary elements.",
  DecrementAndReset: "Value of 'b' decremented by 1 and 'i', 'max' reset to 0.",
  DecrementAndResetFail: "Value of 'b' cannot be decreased further.",
})

/**
 * Function that creates an instance of a Selection Sort State.
 * @param array Array of numbers.
 * @param i Current index.
 * @param max Index of max value.
 * @param b Boundary index.
 * @returns SelectionSortState instance.
 */
function createState(array: number[], i: number, max: number, b: number): SelectionSortState {
  let state: SelectionSortState = {} as SelectionSortState

  state.array = array
  state.b = b
  state.i = i
  state.max = max

  return state
}

const arrayLength = 6

/**
 * Function to create a random array without duplicates.
 * @returns Array containing arrayLength numbers.
 */
function createRandomArray() {
  let array: number[] = []
  let count = arrayLength

  while (count > 0) {
    const number = Math.round(Math.random() * 10)
    let noDuplicates = true

    // Checking for duplicates.
    for (let index = 0; index < array.length && noDuplicates; index++) {
      if (array[index] === number)
        noDuplicates = false
    }

    // If no duplicates are present.
    if (noDuplicates) {
      array.push(number)
      count -= 1
    }
  }

  return array
}

// const state: SelectionSortState = {
//   array: [1234, 567, 89, 0],
//   i: 0,
//   max: 0,
//   b: 4
// }

// const prompt = "Experiment Initialised."

/**
 * Function to update the array containing list of previous states.
 * @param pastStates Array with list of previous states.
 * @param state State to be added.
 * @returns Updated past states array.
 */
function handlePastStateUpdate(pastStates: SelectionSortState[], state: SelectionSortState) {
  let newPastStateArray = pastStates.slice()
  newPastStateArray.push({ ...state })
  return newPastStateArray
}

/**
 * Function to update the array containing list of future states.
 * @param futureStates Array with list of future states.
 * @param state State to be added.
 * @returns Updated future states array.
 */
function handleFutureStateUpdate(futureStates: SelectionSortState[], state: SelectionSortState) {
  let newFutureStateArray = futureStates.slice()
  newFutureStateArray.unshift({ ...state })
  return newFutureStateArray
}

const initialArray = createRandomArray()
const initialState = createState(initialArray, 0, 0, arrayLength)

export default function Experiment() {
  // Router for navigation between pages.
  const router = useRouter()
  // Initialisation.
  const userId = useAppSelector((state) => state.userData.userId)
  const [runId, setRunId] = useState<string>("")
  const [preState, setPreState] = useState<SelectionSortState>({} as SelectionSortState)
  const [state, setState] = useState<SelectionSortState>(initialState)
  const [pastStates, setPastStates] = useState<SelectionSortState[]>([])
  const [futureStates, setFutureStates] = useState<SelectionSortState[]>([])
  const [type, setType] = useState<string>(Action.Init)
  const [prompt, setPrompt] = useState<string>(Prompts.Init)
  const [completed, setCompleted] = useState<boolean>(false)

  // Handlers.
  function handleIncrementI() {
    if (state.i < arrayLength - 1) {
      setPreState({ ...state })
      setPastStates(handlePastStateUpdate(pastStates, state))
      setFutureStates([])
      setState(createState(state.array, state.i + 1, state.max, state.b))
      setType(Action.Increment)
      setPrompt(Prompts.Increment)
    }
    else { setPrompt(Prompts.IncrementFail) }
  }

  function handleUpdateMax() {
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates([])
    setState(createState(state.array, state.i, state.i, state.b))
    setType(Action.UpdateMax)
    setPrompt(Prompts.UpdateMax)
  }

  function handleSwapMax() {
    let newArray = state.array.slice()
    newArray[state.max] = state.array[state.b - 1]
    newArray[state.b - 1] = state.array[state.max]
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates([])
    setState(createState(newArray, state.i, state.i, state.b))
    setType(Action.SwapMax)
    setPrompt(Prompts.SwapMax)
  }

  function handleDecrementAndReset() {
    if (state.b > 0) {
      setPreState({ ...state })
      setPastStates(handlePastStateUpdate(pastStates, state))
      setFutureStates([])
      setState(createState(state.array, 0, 0, state.b - 1))
      setType(Action.DecrementAndReset)
      setPrompt(Prompts.DecrementAndReset)
    }
    else { setPrompt(Prompts.DecrementAndResetFail) }
  }

  function handleUndo() {
    let newPastStates = pastStates.slice()
    newPastStates.pop()
    setPreState({ ...state })
    setPastStates(newPastStates)
    setFutureStates(handleFutureStateUpdate(futureStates, state))
    setState(pastStates[pastStates.length - 1])
    setType(Action.Undo)
    setPrompt(Prompts.Undo)
  }

  function handleRedo() {
    let newFutureStates = futureStates.slice()
    newFutureStates.shift()
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates(newFutureStates)
    setState(futureStates[0])
    setType(Action.Redo)
    setPrompt(Prompts.Redo)
  }

  function handleReset() {
    setPreState({ ...state })
    setPastStates([])
    setFutureStates([])
    setState(initialState)
    setType(Action.Reset)
    setPrompt(Prompts.Reset)
  }

  function handleSubmit() {
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates([])
    setState(state)
    setType(Action.Submit)
    setPrompt(Prompts.Submit)
  }

  function handleConfirmSubmit() {
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates([])
    setState({ ...state })
    setType(Action.ConfirmSubmit)
    setPrompt(Prompts.ConfirmSubmit)
    if (runId !== "") { complete(runId, setCompleted) }
  }

  function handleCancelSubmit() {
    setPreState({ ...state })
    setPastStates(handlePastStateUpdate(pastStates, state))
    setFutureStates([])
    setState({ ...state })
    setType(Action.CancelSubmit)
    setPrompt(Prompts.CancelSubmit)
  }

  // Log actions.
  useEffect(() => {
    console.log(userId)
    // Generating Run ID
    if (userId !== "" && runId === "") {
      // console.log(userId)
      createRun(userId, setRunId)
    }
    else if (userId !== "") {
      updateRun({}, runId, type, preState, state)
    }

    if (completed) {
      router.push('/thanks')
    }
  }, [runId, type, preState, state, completed])

  return (
    <Layout >
      {/* Header */}
      <header
        id='headerBlock'
        className={'grid p-4 grid-cols-4 justify-around bg-gradient-to-r from-blue-600 from-25% to-sky-600  shadow-lg'}
      >
        <span className={"px-4 font-sans text-2xl font-bold text-slate-50 col-span-3 justify-self-start"}>
          Driving Test - Selection Sort
        </span>
        <div className='col-span-1 flex justify-center items-center'>
          {/* Submit Button */}
          <button
            type='button'
            className='transition ease-out hover:scale-110 hover:duration-400
                px-2 py-1 border-2 border-white/75 hover:border-white hover:bg-slate-50/10 rounded-full
                text-xl font-semibold text-slate-50'
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </header>
      {/* Experiment */}
      <div className="flex-grow flex overflow-hidden">
        {/* Information */}
        <div className="max-w-lg overflow-y-auto shadow-md p-6 text-lg">
          <Instructions />
        </div>
        {/* Activity */}
        <div className="w-full text-lg overflow-x-auto">
          <div className="relative h-full w-full">
            {/* Submit Window */}
            <div
              className={"absolute z-10 justify-center items-center align-middle flex flex-col w-full h-full "
                + (type == Action.Submit ? "backdrop-blur-md" : "hidden")}
            >
              <div className="flex flex-col justify-center items-center align-middle bg-slate-50 text-lg w-1/3 h-1/3 shadow-lg p-2 rounded-md border-black border-2">
                <span className="flex text-center">Comfirm Submission?</span>
                <div className="flex flex-row justify-between p-2">
                  <ActionButton
                    id="confirm"
                    type="primary"
                    handler={() => handleConfirmSubmit()}
                  >
                    Confirm
                  </ActionButton>
                  <ActionButton
                    id="cancel"
                    type="secondary"
                    handler={() => handleCancelSubmit()}
                  >
                    Cancel
                  </ActionButton>
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className={"flex flex-col justify-evenly items-center w-full h-full "}>
              {/* Prompt */}
              <div className="w-full">
                <div
                  className={"text-center m-4 p-2 rounded-md border-2 "
                    + ((prompt === Prompts.DecrementAndResetFail || prompt === Prompts.IncrementFail)
                      ? "bg-red-300 border-red-400"
                      : (prompt === Prompts.DecrementAndReset || prompt === Prompts.Increment || prompt === Prompts.SwapMax || prompt === Prompts.UpdateMax || prompt === Prompts.ConfirmSubmit)
                        ? "bg-green-300 border-green-400"
                        : "bg-blue-300 border-blue-400"
                    )
                  }
                >
                  {prompt}
                </div>
              </div>
              {/* Variables */}
              <div className="flex flex-row w-full items-center justify-center h-1/2">
                <div className="flex flex-col text-center w-1/6 p-1">
                  i = {state.i}
                  <br />
                  max = {state.max}
                  <br />
                  b = {state.b}
                </div>
                <div className="flex w-full justify-evenly items-center">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <span className="p-2">value:</span>
                    <span>index:</span>
                  </div>
                  {state.array.map((value, index) => {
                    return (<div className="flex flex-col justify-center items-center space-y-2" key={index}>
                      <ArrayElement value={value} index={index} highlight={index === state.i} />
                      <span>{index}</span>
                    </div>)
                  })}
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-col items-center space-y-2 p-2">
                <div className="flex justify-between">
                  <ActionButton
                    id="inc"
                    type="primary"
                    disabled={state.i >= arrayLength - 1}
                    handler={() => handleIncrementI()}
                  >
                    Increment i
                  </ActionButton>
                  <ActionButton
                    id="update"
                    type="primary"
                    handler={() => handleUpdateMax()}
                  >
                    Update max
                  </ActionButton>
                  <ActionButton
                    id="swap"
                    type="primary"
                    disabled={state.b < 1}
                    handler={() => handleSwapMax()}
                  >
                    Swap max
                  </ActionButton>
                  <ActionButton
                    id="dec"
                    type="primary"
                    disabled={state.b <= 0}
                    handler={() => handleDecrementAndReset()}
                  >
                    Decrement b, Reset i and max
                  </ActionButton>
                </div>
                <div className="flex justify-between">
                  <ActionButton
                    id="undo"
                    type="secondary"
                    disabled={pastStates.length === 0}
                    handler={() => handleUndo()}
                  >
                    Undo
                  </ActionButton>
                  <ActionButton
                    id="redo"
                    type="secondary"
                    disabled={futureStates.length === 0}
                    handler={() => handleRedo()}
                  >
                    Redo
                  </ActionButton>
                  <ActionButton
                    id="reset"
                    type="secondary"
                    handler={() => handleReset()}
                  >
                    Reset
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center p-2 border-black border-t-2">Copyright &copy; 2023 Algodynamics.</div>
    </Layout>
  )
}
