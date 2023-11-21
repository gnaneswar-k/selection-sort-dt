"use client"

import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { AxiosInstance } from 'axios';

/**
 * Function to fetch the algorithmID and redirect the user to the experiment page.
 * @param input userID.
 * @param router Next.js router object.
 * @param client Axios client for backend.
 */
const getAlgorithm = async (input: string, router: ReturnType<typeof useRouter>, client: AxiosInstance | null) => {
  // Path to use getAlgorithm API.
  let final = "/getAlgorithm/" + input;
  if (!client) {
    console.log("Entered getAlgorithm");
    // Redirect to the experiment.
    router.push('/experiment');
  }
  else {
    // Fetch the algorithmId.
    await client
      .get(final)
      .then((response: any) => {
        // Read userID and algorithmID and store them in local storage.
        let id = response.data.id;
        let algorithmId = response.data.algorithmId;
        localStorage.setItem("userID", id);
        localStorage.setItem("algorithmID", algorithmId);
        // Redirect to the experiment.
        router.push('/experiment');
      })
      .catch((response: any) => {
        alert("Something went wrong.");
      });
  }
};

/**
 * Function to create/fetch userID and proceed with getAlgorithm API.
 * @param e (optional) HTML element whose properties can be modified.
 * @param router Next.js router object.
 * @param client Axios client for backend.
 */
const onClickAgree = async (e: MouseEvent<HTMLButtonElement>, router: ReturnType<typeof useRouter>, client: AxiosInstance | null) => {
  // Logging for testing.
  console.log("Clicked Agree Button.");
  // Disable button.
  e.currentTarget.disabled = true;
  // Remove hover and blue color from class
  e.currentTarget.classList.remove("hover:bg-blue-600");
  e.currentTarget.classList.remove("bg-blue-500");
  // Add gray color
  e.currentTarget.classList.add("bg-gray-500");

  // Call createUser API to generate userID.
  if (client) {
    while (true) {
      let input = "";
      // Prompt for userID.
      const id = prompt("Please enter your roll number.");
      if (id !== null) {
        // Create user or check if already existing through endpoint.
        const res = await client.get("/createUser/" + id);
        input = res.data.id;
        // Store userId in local storage.
        localStorage.setItem("userID", input);
        // Get the algorithmId.
        getAlgorithm(input, router, client);
      }
      else
        alert("Please enter your roll number to proceed further!");
    };
  }
  // When no client is provided.
  else {
    // Get the algorithmId.
    getAlgorithm("input", router, client);
  }
};

/**
 * Function to generate an Agree button.
 * @param object Object containing the Axios client for communicating with the backend.
 * @returns Button which carries out the Agree function.
 */
function AgreeButton({ backendClient }: { backendClient?: AxiosInstance }) {
  // Axios client for backend.
  let client: AxiosInstance | null = null;
  // Update the backend for other functions to refer.
  if (backendClient !== undefined)
    client = backendClient;

  const router = useRouter();

  return (
    <button
      type="button"
      id="agree"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 m-1 rounded text-lg"
      // Read Roll Number, generate userID and call getAlgorithm function to fetch algorithmID.
      onClick={(e) => onClickAgree(e, router, client)}
    >
      Agree
    </button>
  )
};

export default AgreeButton;
