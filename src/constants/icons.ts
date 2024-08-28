const path = (name: string) => {
  return '/assets/icons/' + name;
};

export const ICONS = [
  { id: '0', src: path('exercise.png'), name: 'exercise' },
  { id: '1', src: path('pushups.png'), name: 'pushups' },
  { id: '2', src: path('deadlift.png'), name: 'deadlift' },
  { id: '3', src: path('running.png'), name: 'running' },
  { id: '4', src: path('sit-ups.png'), name: 'sit-ups' },
  { id: '5', src: path('cycling.png'), name: 'cycling' },
  { id: '6', src: path('treadmill.png'), name: 'treadmill' },
  { id: '7', src: path('pilates.png'), name: 'pilates' },
  { id: '8', src: path('spinning.png'), name: 'spinning' },
  { id: '9', src: path('barbell.png'), name: 'barbell' },
  { id: '10', src: path('dumbbell.png'), name: 'dumbbell' },
  { id: '11', src: path('weightlifting.png'), name: 'weightlifting' },
  { id: '12', src: path('staircase.png'), name: 'staircase' },
  { id: '13', src: path('squats.png'), name: 'squats' },
  { id: '14', src: path('learning.png'), name: 'learning' },
  { id: '15', src: path('swimmer.png'), name: 'swimmer' },
  { id: '16', src: path('bench-press.png'), name: 'bench-press' },
  { id: '17', src: path('pullups.png'), name: 'pullups' },
  { id: '18', src: path('rowing-machine.png'), name: 'rowing-machine' },
];
