import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { aiService } from '@/lib/ai-service';
import { useToast } from '@/hooks/use-toast';
import type { QuizQuestion } from '@/types/sustainability';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary focus area?",
    options: [
      {
        value: 'energy',
        title: 'Energy Access',
        description: 'Providing reliable, clean energy to communities',
        icon: 'fas fa-bolt'
      },
      {
        value: 'agriculture',
        title: 'Agriculture',
        description: 'Improving farming practices and food security',
        icon: 'fas fa-seedling'
      },
      {
        value: 'water',
        title: 'Water & Sanitation',
        description: 'Clean water access and waste management',
        icon: 'fas fa-tint'
      },
      {
        value: 'education',
        title: 'Education',
        description: 'Digital learning and skills development',
        icon: 'fas fa-graduation-cap'
      }
    ]
  },
  {
    id: 2,
    question: "What's your budget range?",
    options: [
      {
        value: 'small',
        title: 'Pilot Project',
        description: '$10,000 - $50,000',
        icon: 'fas fa-seedling'
      },
      {
        value: 'medium',
        title: 'Community Scale',
        description: '$50,000 - $500,000',
        icon: 'fas fa-users'
      },
      {
        value: 'large',
        title: 'Regional Impact',
        description: '$500,000+',
        icon: 'fas fa-rocket'
      }
    ]
  },
  {
    id: 3,
    question: "What's your implementation timeline?",
    options: [
      {
        value: 'immediate',
        title: 'Immediate',
        description: '0-6 months',
        icon: 'fas fa-clock'
      },
      {
        value: 'medium',
        title: 'Medium-term',
        description: '6-18 months',
        icon: 'fas fa-calendar'
      },
      {
        value: 'long',
        title: 'Long-term',
        description: '18+ months',
        icon: 'fas fa-calendar-alt'
      }
    ]
  },
  {
    id: 4,
    question: "Which region are you focusing on?",
    options: [
      {
        value: 'west',
        title: 'West Africa',
        description: 'Nigeria, Ghana, Senegal, Mali',
        icon: 'fas fa-map-marker-alt'
      },
      {
        value: 'east',
        title: 'East Africa',
        description: 'Kenya, Uganda, Tanzania, Ethiopia',
        icon: 'fas fa-map-marker-alt'
      },
      {
        value: 'southern',
        title: 'Southern Africa',
        description: 'South Africa, Zimbabwe, Botswana',
        icon: 'fas fa-map-marker-alt'
      },
      {
        value: 'central',
        title: 'Central Africa',
        description: 'DRC, Cameroon, Chad',
        icon: 'fas fa-map-marker-alt'
      }
    ]
  },
  {
    id: 5,
    question: "What's your experience level?",
    options: [
      {
        value: 'beginner',
        title: 'New to Sustainability',
        description: 'Looking to learn and get started',
        icon: 'fas fa-star'
      },
      {
        value: 'intermediate',
        title: 'Some Experience',
        description: 'Have implemented some projects',
        icon: 'fas fa-star-half-alt'
      },
      {
        value: 'advanced',
        title: 'Experienced',
        description: 'Multiple successful implementations',
        icon: 'fas fa-crown'
      }
    ]
  }
];

export function SolutionMatchmaker() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const progress = (currentQuestion / quizQuestions.length) * 100;

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (questionId < quizQuestions.length) {
      setTimeout(() => {
        setCurrentQuestion(questionId + 1);
      }, 300);
    } else {
      // Quiz complete, generate recommendations
      generateRecommendations();
    }
  };

  const generateRecommendations = async () => {
    setIsGenerating(true);
    try {
      const quizAnswers = {
        focusArea: answers[1] || '',
        budget: answers[2] || '',
        timeline: answers[3] || '',
        region: answers[4] || '',
        experience: answers[5] || '',
      };

      const recs = await aiService.getSolutionRecommendations(quizAnswers);
      setRecommendations(recs);
      setShowResults(true);
      
      toast({
        title: "Recommendations Ready",
        description: "We've found the perfect sustainability solutions for you!",
      });
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const goToPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResults) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-4">Your Perfect Match!</h3>
                <p className="text-lg text-muted-foreground">
                  Based on your responses, here are our AI-recommended solutions:
                </p>
              </div>
              
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="p-6" data-testid={`card-recommendation-${index}`}>
                    <CardContent className="p-0">
                      <h4 className="font-bold text-foreground mb-3">{rec.title}</h4>
                      <p className="text-muted-foreground mb-4">{rec.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rec.sdgs?.map((sdg: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            {sdg}
                          </span>
                        ))}
                        {rec.tools?.map((tool: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Match Score:</span>
                        <Progress value={rec.matchScore || 85} className="w-24 mr-2" />
                        <span className="text-sm font-medium text-primary">{rec.matchScore || 85}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  onClick={restartQuiz}
                  data-testid="button-restart-quiz"
                >
                  Retake Quiz
                </Button>
                <Button
                  className="bg-secondary text-secondary-foreground btn-seed-hover"
                  data-testid="button-get-detailed-plan"
                >
                  Get Detailed Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            Solution <span className="text-gradient">Matchmaker</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Answer a few questions and let our AI recommend the most suitable sustainability solutions for your specific context.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            {isGenerating ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Generating Recommendations</h3>
                <p className="text-muted-foreground">Our AI is analyzing your responses...</p>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Question <span data-testid="text-current-question">{currentQuestion}</span> of {quizQuestions.length}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <span data-testid="text-progress-percent">{Math.round(progress)}</span>% Complete
                    </span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>

                {/* Current Question */}
                {quizQuestions.map((question) => (
                  currentQuestion === question.id && (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-testid={`quiz-question-${question.id}`}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-6">{question.question}</h3>
                      <div className={`grid ${question.options.length > 2 ? 'md:grid-cols-2' : ''} gap-4`}>
                        {question.options.map((option) => (
                          <Button
                            key={option.value}
                            variant="outline"
                            onClick={() => handleAnswer(question.id, option.value)}
                            className={`p-6 h-auto text-left justify-start hover:border-primary transition-all ${
                              answers[question.id] === option.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border'
                            }`}
                            data-testid={`button-quiz-option-${option.value}`}
                          >
                            <div className="flex items-center w-full">
                              <div className="flex items-center mr-4">
                                <i className={`${option.icon} text-2xl text-primary mr-3`}></i>
                                <div>
                                  <h4 className="font-semibold text-foreground">{option.title}</h4>
                                  <p className="text-muted-foreground text-sm">{option.description}</p>
                                </div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={goToPrevious}
                    disabled={currentQuestion === 1}
                    data-testid="button-quiz-previous"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentQuestion === quizQuestions.length && answers[currentQuestion]) {
                        generateRecommendations();
                      }
                    }}
                    disabled={!answers[currentQuestion] || currentQuestion < quizQuestions.length}
                    className="bg-primary text-primary-foreground btn-seed-hover"
                    data-testid="button-quiz-finish"
                  >
                    {currentQuestion === quizQuestions.length ? 'Get Recommendations' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
