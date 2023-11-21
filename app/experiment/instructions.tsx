export default function Information() {
  return (
    <div className="flex-col space-y-4">
      <h1 className="text-center font-bold text-lg">Objective</h1>
      <p>
        Apply Selection Sort Algorithm on the given array to sort it using the provided controls.
        <br />
        <em>Please note that:</em>
      </p>
      <ol className="list-decimal ps-5">
        <li>You are not supposed to apply any optimizations over the original selection sort algorithm.</li>
        <li>Sorting of the array is the secondary objective; The primary objective is the correct application of the selection sort algorithm.</li>
      </ol>
      <div className="text-center m-1 flex-col justify-center space-y-2">
        <h1 className="font-bold text-lg">Variables Description</h1>
        <table className="w-full" id="variables-table">
          <thead>
            <tr>
              <th className="border-2 border-black">Variable</th>
              <th className="border-2 border-black">Data Type</th>
              <th className="border-2 border-black">Valid values</th>
              <th className="border-2 border-black">Initialization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black">i</td>
              <td className="border-2 border-black">int</td>
              <td className="border-2 border-black">[0,n)</td>
              <td className="border-2 border-black">0</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 border-black">max</td>
              <td className="border-2 border-black">int</td>
              <td className="border-2 border-black">[0,n)</td>
              <td className="border-2 border-black">0</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 border-black">b</td>
              <td className="border-2 border-black">int</td>
              <td className="border-2 border-black">[0,n]</td>
              <td className="border-2 border-black">n</td>
            </tr>
          </tbody>
        </table>
        <p>where n is the length of the array.</p>
      </div>
      <div className="text-center m-1 flex-col justify-center space-y-2">
        <h1 className="font-bold text-lg">Controls Description</h1>
        <table className="w-full" id="variables-table">
          <thead>
            <tr>
              <th className="border-2 border-black">Control</th>
              <th className="border-2 border-black">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black">Increment i</td>
              <td className="border-2 border-black">Increments i by 1, if i &lt; n - 1</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 border-black">Update max and Increment i</td>
              <td className="border-2 border-black">Updates the value of max as i and increments i by 1, if i &lt; n - 1</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 border-black">Swap max</td>
              <td className="border-2 border-black">Swaps the array indices of max and b - 1</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="border-2 border-black">Decrement b, Reset i and max</td>
              <td className="border-2 border-black">Decrements b by 1 and resets i and max to 0, if b &gt; 0</td>
            </tr>
          </tbody>
        </table>
        <p>where n is the length of the array.</p>
      </div>
      <div className="m-1 space-y-2">
        <h1 className="text-center font-bold text-lg">Procedure</h1>
        <ol className="list-decimal ps-5">
          <li>Click on suitable control to simulate next step of selection sort algorithm.</li>
          <li>You can do <em>Undo</em> and <em>Redo</em> actions or <em>Reset</em> the experiment by clicking on the respective buttons as per your need.</li>
          <li>Click on the <em>Submit Run</em> button when you are done.</li>
        </ol>
      </div>
    </div>
  )
};
