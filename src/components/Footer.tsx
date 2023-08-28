import { createStyles, Anchor, Group, rem } from '@mantine/core';
import footerData from '../data/footer-data'
import socialData from '../data/social-data'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; icon: string }[];
}

export default function FooterCentered() {
  const { classes } = useStyles();
  const items = (links: FooterCenteredProps) => {
    return (
      links.links.map((link) => (
        <Anchor<'a'>
          color="dimmed"
          key={link.icon}
          href={link.link}
          sx={{ lineHeight: 1 }}
          onClick={(event) => event.preventDefault()}
          size="sm"
        >
          {link.icon}
        </Anchor>
      )
      )
    )
  }

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items({ links: footerData })}</Group>
        <Group spacing="xs" position="right" noWrap>
          {items({ links: socialData })}
        </Group>
      </div>
    </div>
  );
}
