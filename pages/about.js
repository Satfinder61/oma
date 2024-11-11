import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Proje Hakkında</h1>
      <p className="text-lg mb-4">
        Bu proje, modern iş dünyasının hızla değişen ve gelişen ihtiyaçlarına
        yanıt vermek amacıyla tasarlanmış yenilikçi bir görev yönetim
        platformudur. Karmaşık iş akışlarının düzenlenmesini ve etkin bir
        şekilde yönetilmesini sağlayarak kullanıcıların zamandan tasarruf
        etmelerini ve iş süreçlerini optimize etmelerini hedefler. Bu platform,
        kullanıcı dostu arayüzü ve gelişmiş özellikleriyle, bireylerin ve
        ekiplerin projelerini planlarken ve takip ederken daha verimli
        olmalarına katkıda bulunur.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        Platformun Öne Çıkan Özellikleri
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li className="mb-2">
          <strong>İleri Düzey Görev Yönetimi:</strong> Kullanıcılar, projelerini
          özelleştirilebilir kategorilere ayırarak yönetebilir ve görevlerini
          duruma göre organize edebilir. Görevlerin başlangıçtan tamamlanma
          aşamasına kadar olan ilerleyişi, kullanıcıya net bir şekilde sunulur.
        </li>
        <li className="mb-2">
          <strong>Dinamik Puanlama Sistemi:</strong> Platform, görevlerin
          karmaşıklığına ve önceliğine göre, Fibonacci puanlama metoduna dayalı
          bir sistem sunar. Bu sistem, görevlerin önem sırasına göre
          önceliklendirilmesini ve kaynakların etkili bir şekilde kullanılmasını
          sağlar.
        </li>
        <li className="mb-2">
          <strong>Kolay Geri Alma ve İşlem Yönetimi:</strong> Kullanıcılar,
          yanlışlıkla yapılan işlemleri geri alabilir veya tamamlanan görevleri
          kolayca silebilir. Bu özellik, projelerin esnek bir şekilde
          yönetilmesine olanak tanır.
        </li>
        <li className="mb-2">
          <strong>Tam Uyumlu Responsive Tasarım:</strong> Platform, hem masaüstü
          hem de mobil cihazlarda sorunsuz bir kullanıcı deneyimi sunar.
          Gelişmiş responsive tasarım teknikleri ile, kullanıcıların her cihazda
          aynı kalite ve akıcılıkta bir arayüzle çalışması sağlanır.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">
        Kullanılan Teknolojiler ve Teknik Yaklaşım
      </h2>
      <p className="text-lg mb-4">
        Bu proje, öncelikli olarak React teknolojisi ile geliştirilmiştir ve
        bileşen tabanlı bir mimariyi benimser. React’ın sağladığı performans
        odaklı yapısı sayesinde, arayüzdeki etkileşimler hızlı ve akıcıdır.
        Ayrıca, modern CSS framework'leri ve responsive tasarım prensipleri,
        kullanıcı arayüzünün her cihazda en iyi performansı göstermesini sağlar.
        Veri akışları ve güncellemeler, kullanıcı deneyimini ön planda tutarak
        optimize edilmiştir.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        Fibonacci Puanlama Sistemi
      </h2>
      <p className="text-lg mb-4">
        Fibonacci dizisine dayalı olarak geliştirilen bu özel puanlama sistemi,
        görevlerin zorluk derecelerine ve önceliklerine göre bir düzen
        oluşturur. Kullanıcılar, 0, 1, 2, 3, 5, 8, 13, 21 gibi Fibonacci
        sayılarını kullanarak görevleri derecelendirir. Bu sistem, projelerin
        daha verimli planlanmasını ve ekiplerin kaynakları en iyi şekilde
        kullanmasını sağlar.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        Kullanıcı Geri Bildirimleri ve Destek
      </h2>
      <p className="text-lg mb-4">
        Bu platformun sürekli gelişimi ve kullanıcı odaklı bir yapıya sahip
        olması, kullanıcılardan gelen geri bildirimlere büyük önem verilmesi
        sayesinde gerçekleşir. Kullanıcılar, herhangi bir hata bildirimi veya
        önerilerini doğrudan geliştirici ekibe ileterek, projenin daha iyi bir
        hale gelmesine katkıda bulunabilir. Destek ekibi, kullanıcıların
        karşılaştığı sorunlara hızlı yanıt verir ve çözüm önerileri sunar.
      </p>
    </div>
  );
};

export default About;
