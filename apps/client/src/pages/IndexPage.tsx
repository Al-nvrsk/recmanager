import * as React from "react";
import { trpc } from "../shared/hooks/trpc";
import { useTranslation } from "react-i18next";


export default function IndexPage() {
  const userCreator = trpc.createUser.useMutation()
//   getUser.useQuery({ id: 'id_bilbo' });
//   const userCreator = trpc.create;


const { t, i18n } = useTranslation(); 
const toggle = () => { i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')};

  return (
    <div> 
      <button onClick={toggle}>
        {t('test')}
        sfsdfsd
      </button>
    </div>
  );
}
