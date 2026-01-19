import cn from 'classnames'
import { Link } from 'react-router'
import { GaleriaPlusFullLogo } from '../assets/images'
import Button from './button'
import Container from './container'

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}

export function MainHeader({ className, ...props }: MainHeaderProps) {
  return (
    <Container
      as="header"
      className={cn('flex justify-between items-center gap-10', className)}
      {...props}
    >
      <Link to="/">
        <GaleriaPlusFullLogo className="h-5" />
      </Link>

      <div className="flex items-center gap-3">
        <Button>Nova foto</Button>
        <Button variant="secondary">Criar álbum</Button>
      </div>
    </Container>
  )
}
