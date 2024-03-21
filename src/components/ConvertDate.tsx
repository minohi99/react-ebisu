import { parseISO, format } from 'date-fns';
import { ja } from 'date-fns/locale';

type ConvertDateProps = {
  publishDate: string;
};

const ConvertDate: React.FC<ConvertDateProps> = ({ publishDate }) => {
  return (
    <time dateTime={publishDate}>
      {format(parseISO(publishDate), 'yyyy年MM月dd日（E）', {
        locale: ja as any,
      })}
    </time>
  );
};

export default ConvertDate;
