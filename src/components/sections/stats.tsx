import AnimatedCounter from "@/components/animated-counter";
import { Rocket, Lightbulb, Smile } from "lucide-react";

const stats = [
  {
    icon: <Rocket className="h-10 w-10 text-accent" />,
    value: 10,
    label: "Projects Delivered",
    suffix: "+",
  },
  {
    icon: <Smile className="h-10 w-10 text-accent" />,
    value: 5,
    label: "Happy Clients",
    suffix: "+",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-accent" />,
    value: 50,
    label: "Innovative Ideas",
    suffix: "+",
  },
];

const Stats = () => {
  return (
    <div className="bg-[#071436] py-20 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Drive <span className="text-accent">Development</span> And <span className="text-accent">Innovation</span> Forward With Our
            Industry-Leading Expertise
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-5xl font-extrabold">
                <AnimatedCounter to={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-2 text-lg text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
