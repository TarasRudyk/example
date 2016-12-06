import { Gradients } from '/imports/api/gradients/gradients';

if (Gradients.find().count() === 0) {
  const colors = [
    '#1da9fc', '#fc363b', '#FFFC54', '#F77A52', '#9D397E',
    '#BEDB39', '#79BD8F', '#77fc75', '#1F8A70', '#911146',
    '#F29C9C', '#D8CAA8', '#ED8C2B', '#68FFDA', '#5E5A59',
    '#FF6F69', '#FFE11A', '#CC4452', '#77C4D3', '#7E8AA2'
  ];

  for (let i = 0; i < 20; i += 1) {
    for (let j = 0; j < 20; j += 1) {
      Gradients.insert({ gradient: { start: colors[i], stop: colors[j], direction: '0deg' } });
      Gradients.insert({ gradient: { start: colors[i], stop: colors[j], direction: '90deg' } });
    }
  }
}
