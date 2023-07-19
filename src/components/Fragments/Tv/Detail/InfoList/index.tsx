import CardDetailInfo from '@/components/CardDetailInfo';

export default function InfoList () {
  return (
    <section className="p-4 py-6">
      <CardDetailInfo
        title="Status"
        content="Returning Series"
      />
      <CardDetailInfo
        title="Network"
        content="Netflix"
      />
      <CardDetailInfo
        title="Type"
        content="Scripted"
      />
      <CardDetailInfo
        title="Original Language"
        content="English"
      />
      <CardDetailInfo
        title="Budget"
        content="$60.000.000.00"
      />
      <CardDetailInfo
        title="Revenue"
        content="$6.794.519.00"
      />
      <CardDetailInfo
        title="Production Countries"
        content="America, Indonesia"
      />
    </section>
  )
}