export default function Header({
  experiment,
  toggleSubmit,
}: {
  experiment?: boolean;
  toggleSubmit?: (submit: boolean) => void;
}) {
  return (
    <header
      id='headerBlock'
      className={'grid p-4 grid-cols-4 justify-around bg-gradient-to-r '
        + (experiment ? 'from-blue-600 from-25% ' : 'from-sky-600 via-blue-600 ')
        + 'to-sky-600  shadow-lg'}
    >
      <div className={"px-4 font-sans text-2xl font-bold text-slate-50 "
        + (experiment ? 'col-span-3 justify-self-start' : 'col-span-4 justify-self-center')}
      >
        Driving Test - Selection Sort
      </div>
      {experiment && (toggleSubmit !== undefined) && (
        // Button to be converted to a separate component like the agree button.
        <div className='col-span-1 flex justify-center items-center'>
          <button
            type='button'
            className='transition ease-out hover:scale-110 hover:duration-400
                px-2 py-1 border-2 border-white/75 hover:border-white hover:bg-slate-50/10 rounded-full
                text-xl font-semibold text-slate-50'
            onClick={() => toggleSubmit(true)}
          >
            Submit
          </button>
        </div>
      )}
    </header>
  )
};
