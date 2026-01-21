import cn from 'classnames'
import { useNavigate } from 'react-router'
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import Button from '@/components/button'
import ButtonIcon from '@/components/button-icon'
import Skeleton from '@/components/skeleton'

interface PhotosNavigatorProps extends React.ComponentProps<'div'> {
  previousPhotoId?: string
  nextPhotoId?: string
  loading?: boolean
}

export function PhotosNavigator({
  previousPhotoId,
  nextPhotoId,
  loading,
  className,
  ...props
}: PhotosNavigatorProps) {
  const navigate = useNavigate()

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {!loading ? (
        <>
          <ButtonIcon
            icon={ChevronLeftIcon}
            variant="secondary"
            disabled={!previousPhotoId}
            onClick={() => navigate(`/fotos/${previousPhotoId}`)}
          />
          <Button
            icon={ChevronRightIcon}
            variant="secondary"
            disabled={!nextPhotoId}
            onClick={() => navigate(`/fotos/${nextPhotoId}`)}
          >
            Próxima imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
        </>
      )}
    </div>
  )
}
