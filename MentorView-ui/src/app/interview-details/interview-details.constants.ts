export interface InterviewStyle {
    id: string;
    name: string;
    description?: string;
}

export const INTERVIEW_STYLES: InterviewStyle[] = [
    { 
        id: 'behavioral',
        name: 'Behavioral',
        description: 'Questions about past experiences and how you handled specific situations'
    },
    { 
        id: 'technical',
        name: 'Technical',
        description: 'Questions about technical skills, coding problems, and practical knowledge'
    },
    { 
        id: 'cultural',
        name: 'Cultural',
        description: 'Questions about company values, team fit, and work style preferences'
    },
    { 
        id: 'motivation',
        name: 'Motivation',
        description: 'Questions about what drives you, your career goals, and aspirations'
    },
    { 
        id: 'strengths',
        name: 'Strength Based',
        description: 'Questions focusing on your key strengths and successful experiences'
    },
    { 
        id: 'weaknesses',
        name: 'Weakness Based',
        description: 'Questions about areas of improvement and how you handle challenges'
    },
    { 
        id: 'situational',
        name: 'Situational',
        description: 'Questions about how you would handle hypothetical scenarios'
    },
    { 
        id: 'custom',
        name: 'Custom Question',
        description: 'Write your own interview question'
    }
];

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