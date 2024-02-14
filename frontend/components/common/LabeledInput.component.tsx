type LabeledInputProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabeledInput = ({ label, ...props }: LabeledInputProps) => (
  <div className="flex flex-col w-full gap-1 mt-8">
    <label htmlFor={props.id} className="text-sm text-dark">
      {label}
    </label>
    <input
      id={props.id}
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className="col-span-2 border border-gray-300 rounded-md p-4 mt-2 outline-none"
    />
  </div>
);

export default LabeledInput;
