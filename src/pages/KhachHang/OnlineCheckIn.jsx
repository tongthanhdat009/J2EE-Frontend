import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function OnlineCheckIn() {
  const { t } = useTranslation();
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCheckIn = (e) => {
    e.preventDefault();
    console.log({ bookingCode, lastName });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-3">{t('pages.online_checkin.title')}</h1>
            <p className="text-gray-600">{t('pages.online_checkin.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Check-in Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('pages.online_checkin.passenger_info_title')}</h2>
              
              <form onSubmit={handleCheckIn} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('pages.online_checkin.label_booking_code')}
                  </label>
                  <input
                    type="text"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                    placeholder={t('pages.online_checkin.placeholder_booking_code')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                    maxLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('pages.online_checkin.label_last_name')}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t('pages.online_checkin.placeholder_last_name')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  {t('pages.online_checkin.checkin_btn')}
                </button>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>{t('pages.online_checkin.note_title', 'Lưu ý:')}</strong> {t('pages.online_checkin_extra.note')}
                </p>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⏰</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{t('pages.online_checkin_extra.benefit_time', t('pages.online_checkin.benefit_time'))}</h3>
                    <p className="text-sm text-gray-600">{t('pages.online_checkin_extra.benefit_time_desc')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎫</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{t('pages.online_checkin_extra.benefit_boarding_pass', t('pages.online_checkin.benefit_boarding_pass'))}</h3>
                    <p className="text-sm text-gray-600">{t('pages.online_checkin_extra.benefit_boarding_pass_desc')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💺</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{t('pages.online_checkin_extra.benefit_seat', t('pages.online_checkin.benefit_seat'))}</h3>
                    <p className="text-sm text-gray-600">{t('pages.online_checkin_extra.benefit_seat_desc')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎒</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{t('pages.online_checkin_extra.benefit_baggage', t('pages.online_checkin.benefit_baggage'))}</h3>
                    <p className="text-sm text-gray-600">{t('pages.online_checkin_extra.benefit_baggage_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineCheckIn;
