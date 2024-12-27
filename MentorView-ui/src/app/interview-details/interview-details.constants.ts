export interface InterviewStyle {
    id: string;
    name: string;
}

export interface QuestionSuggestions {
    [key: string]: string[];
}

export const INTERVIEW_STYLES: InterviewStyle[] = [
    { id: 'behavioral', name: 'Behavioral Interview' },
    { id: 'technical', name: 'Technical Interview' },
    { id: 'system_design', name: 'System Design Interview' },
    { id: 'leadership', name: 'Leadership Interview' },
    { id: 'general', name: 'General Interview' }
];

export const QUESTION_SUGGESTIONS: QuestionSuggestions = {
    'behavioral': [
        'Tell me about a time you faced a difficult challenge at work',
        'Describe a situation where you had to work with a difficult team member',
        'Give an example of a goal you reached and how you achieved it'
    ],
    'technical': [
        'Explain how you would implement a binary search tree',
        'How would you optimize a slow-performing database query?',
        'Describe the differences between REST and GraphQL'
    ],
    'system_design': [
        'Design a URL shortening service like bit.ly',
        'How would you design Twitter\'s backend?',
        'Design a distributed cache system'
    ],
    'leadership': [
        'Tell me about a time you had to make a difficult decision as a leader',
        'How do you motivate your team members?',
        'Describe your approach to managing conflicting priorities'
    ],
    'general': [
        'Why are you interested in this position?',
        'Where do you see yourself in 5 years?',
        'What are your greatest strengths and weaknesses?'
    ]
};

export const ROLES: string[] = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'Marketing Manager',
    'Sales Representative',
    'Financial Analyst',
    'Human Resources Manager',
    'Operations Manager',
    'Business Analyst',
    'Project Manager',
    'Accountant',
    'Investment Banker',
    'Consultant',
    'Economist'
];

export const COMPANIES: string[] = [
    'Google',
    'Facebook',
    'Amazon',
    'Microsoft',
    'Apple',
    'Goldman Sachs',
    'JP Morgan Chase',
    'Morgan Stanley',
    'Bank of America',
    'Deloitte',
    'PwC',
    'EY',
    'KPMG',
    'McKinsey & Company',
    'Boston Consulting Group',
    'Bain & Company',
    'Barclays',
    'HSBC',
    'Lloyds Banking Group',
    'Unilever',
    'Procter & Gamble'
];