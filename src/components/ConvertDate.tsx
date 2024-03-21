import { parseISO, format } from 'date-fns';
import ja from 'date-fns/locale/ja';

const ConvertDate = ({ publishDate }) => {
  return (
    <time dateTime={publishDate}>
      {format(parseISO(publishDate), 'yyyy月MM日dd日（E）', { locale: ja })}
    </time>
  );
};

export default ConvertDate;
