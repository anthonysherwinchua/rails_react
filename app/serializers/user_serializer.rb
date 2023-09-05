class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :jti, :qr_code

  def qr_code
    RQRCode::QRCode.new(qr_code_url).as_svg(
      color: "000",
      shape_rendering: "crispEdges",
      module_size: 3,
      use_path: true,
    )
  end

  private

  def issuer
    @issuer ||= 'rails_react'
  end

  def qr_code_url
    # "otpauth://totp/#{issuer}:#{object.id}?secret=#{object.otp_secret}&issuer=#{issuer}&algorithm=sha1&digits=6&period=30"
    "otpauth://totp/#{object.email}?secret=#{object.otp_secret}"
  end
end