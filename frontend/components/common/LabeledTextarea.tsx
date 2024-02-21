type LabeledTextareaProps = {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const LabeledTextarea = ({ label, ...props }: LabeledTextareaProps) => {
  return (
    <div className="flex flex-col w-full gap-1 mt-8">
      <label htmlFor={props.id} className="text-sm text-dark">
        {label}
      </label>
      <textarea
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="col-span-2 border border-gray-300 rounded-md p-4 mt-2 outline-none h-[10rem] resize-none"
      />
    </div>
  );
};

export default LabeledTextarea;
