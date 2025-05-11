import { SparklesIcon } from "../../icons";

interface BenefitCardProps {
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-6  rounded-xl ">
      <SparklesIcon className="w-6 h-6 text-black" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default BenefitCard;
