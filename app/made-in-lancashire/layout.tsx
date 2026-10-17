import MailingListPopup from '@/components/made-in-lancashire/MailingListPopup'

/** Every Made in Lancashire page carries the mailing list pop-up. */
export default function MadeInLancashireLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MailingListPopup />
    </>
  )
}
