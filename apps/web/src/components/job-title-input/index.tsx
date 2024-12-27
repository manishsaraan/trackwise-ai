import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const jobTitlePatterns = {
  // Full Stack
  fullstack: {
    titles: [
      "Full Stack Developer",
      "Full Stack MERN Developer",
      "Full Stack MEAN Developer",
      "Full Stack Python Developer",
      "Full Stack Java Developer",
      "Full Stack PHP Developer",
      "Full Stack Ruby Developer",
      "Full Stack .NET Developer",
      "Full Stack Laravel Developer",
      "Full Stack Django Developer"
    ],
    pattern: "full"
  },
  // JavaScript Ecosystem
  mern: {
    titles: ["MERN Stack Developer", "Full Stack MERN Developer"],
    pattern: "mern"
  },
  mean: {
    titles: ["MEAN Stack Developer", "Full Stack MEAN Developer"],
    pattern: "mean"
  },
  javascript: {
    titles: [
      "JavaScript Developer",
      "Node.js Developer",
      "TypeScript Developer",
      "Express.js Developer"
    ],
    pattern: "javascript"
  },
  // Frontend
  frontend: {
    titles: [
      "Frontend Developer",
      "Frontend React Developer",
      "Frontend Angular Developer",
      "Frontend Vue Developer",
      "Frontend Svelte Developer",
      "UI Developer"
    ],
    pattern: "front"
  },
  react: {
    titles: ["React Developer", "Frontend React Developer", "React Native Developer"],
    pattern: "react"
  },
  angular: {
    titles: ["Angular Developer", "Frontend Angular Developer"],
    pattern: "angular"
  },
  vue: {
    titles: ["Vue Developer", "Frontend Vue Developer"],
    pattern: "vue"
  },
  // Backend
  backend: {
    titles: [
      "Backend Developer",
      "Backend Node.js Developer",
      "Backend Python Developer",
      "Backend Java Developer",
      "Backend PHP Developer",
      "Backend Ruby Developer",
      "Backend Go Developer",
      "Backend .NET Developer",
      "Backend Rust Developer"
    ],
    pattern: "back"
  },
  // Language Specific
  python: {
    titles: [
      "Python Developer",
      "Django Developer",
      "Flask Developer",
      "FastAPI Developer",
      "Backend Python Developer"
    ],
    pattern: "python"
  },
  java: {
    titles: [
      "Java Developer",
      "Spring Boot Developer",
      "Java Enterprise Developer",
      "Backend Java Developer"
    ],
    pattern: "java"
  },
  php: {
    titles: [
      "PHP Developer",
      "Laravel Developer",
      "Symfony Developer",
      "WordPress Developer",
      "Backend PHP Developer"
    ],
    pattern: "php"
  },
  ruby: {
    titles: [
      "Ruby Developer",
      "Ruby on Rails Developer",
      "Backend Ruby Developer"
    ],
    pattern: "ruby"
  },
  dotnet: {
    titles: [
      ".NET Developer",
      "C# Developer",
      "ASP.NET Developer",
      "Backend .NET Developer"
    ],
    pattern: "net"
  },
  go: {
    titles: ["Go Developer", "Golang Developer", "Backend Go Developer"],
    pattern: "go"
  },
  rust: {
    titles: ["Rust Developer", "Backend Rust Developer"],
    pattern: "rust"
  },
  // Mobile
  mobile: {
    titles: [
      "Mobile Developer",
      "iOS Developer",
      "Android Developer",
      "React Native Developer",
      "Flutter Developer",
      "Xamarin Developer",
      "Swift Developer",
      "Kotlin Developer"
    ],
    pattern: "mobile"
  },
  // Specialized
  devops: {
    titles: ["DevOps Engineer", "DevOps Developer", "Site Reliability Engineer"],
    pattern: "devops"
  },
  cloud: {
    titles: [
      "Cloud Developer",
      "AWS Developer",
      "Azure Developer",
      "Google Cloud Developer"
    ],
    pattern: "cloud"
  },
  blockchain: {
    titles: [
      "Blockchain Developer",
      "Smart Contract Developer",
      "Solidity Developer"
    ],
    pattern: "blockchain"
  },
  data: {
    titles: [
      "Data Engineer",
      "Big Data Developer",
      "ETL Developer",
      "Data Pipeline Engineer"
    ],
    pattern: "data"
  }
};

interface JobTitleInputProps {
  onSelect: (title: string) => void;
  value?: string;
  error?: string;
}

export default function JobTitleInput({ onSelect, value, error }: JobTitleInputProps) {
  const [input, setInput] = useState<string>(value || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (value !== undefined) {
      setInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const searchTerm = input.toLowerCase();
    let matchedTitles = new Set<string>();

    // Search through patterns
    Object.values(jobTitlePatterns).forEach(({ titles, pattern }) => {
      if (searchTerm.includes(pattern) || pattern.includes(searchTerm)) {
        titles.forEach(title => matchedTitles.add(title));
      }
    });

    // Also search through all titles for partial matches
    Object.values(jobTitlePatterns).forEach(({ titles }) => {
      titles.forEach(title => {
        if (title.toLowerCase().includes(searchTerm)) {
          matchedTitles.add(title);
        }
      });
    });

    setSuggestions(Array.from(matchedTitles));
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (title: string) => {
    onSelect(title);
    setInput(title);
    setShowSuggestions(false);
  };

  return (
    <>
    <div className="relative">
        <label htmlFor="jobTitle" className="label">
					<span className="label-text font-medium">Job Title:</span>
				</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter job title (e.g., PHP Developer, Ruby Developer)..."
              className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onFocus={() => setShowSuggestions(true)}
            />
            <Search 
              className="absolute right-3 text-gray-400 w-5 h-5"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
              {suggestions.map((title, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSuggestionClick(title)}
                >
                  {title}
                </div>
              ))}
            </div>
          )}

          {error && (
            <span className="text-error text-sm mt-1">{error}</span>
          )}
        </div> 
    </>
  );
}