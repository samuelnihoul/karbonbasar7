import { createStyles, ThemeIcon, Text, SimpleGrid, Box, Stack } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  className,
  ...others
}) {
  return (
    <div >
      <Box mr="md">
        <Icon size="1.5rem" />
      </Box>
      <div>
        <Text size="xs">
          {title}
        </Text>
        <Text>{description}</Text>
      </div>
    </div>
  );
}


const DATA = [
  { title: 'Email', description: 'contact@harmonia.eco', icon: IconAt },
  { title: 'Phone', description: '+33 782 949 579', icon: IconPhone },
  { title: 'Address', description: '14 La Blaye - 22150 Ploeuc-l\'Hermitage - FR', icon: IconMapPin },
  { title: 'Working hours', description: '8 a.m. – 5 p.m.', icon: IconSun },
];

export function ContactIconsList({ data = DATA, variant }) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export function ContactIcons() {
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
      >
        <ContactIconsList />
      </Box>

      <Box
      >
        <ContactIconsList variant="gradient" />
      </Box>
    </SimpleGrid>
  );
}
