import cn from 'classnames'
import { Link } from 'react-router'
import { AlbumNewDialog } from '@/contexts/albums/components/album-new-dialog'
import { PhotoNewDialog } from '@/contexts/photos/components/photo-new-dialog'
import { GaleriaPlusFullLogo } from '../assets/images'
import Button from './button'
import Container from './container'
import Divider from './divider'
import { PhotosSearch } from './photos-search'

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

      <PhotosSearch />
      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
        <AlbumNewDialog trigger={<Button variant="secondary">Criar álbum</Button>} />
      </div>
    </Container>
  )
}
