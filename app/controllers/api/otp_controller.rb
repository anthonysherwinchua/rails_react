class Api::OtpController < ApplicationController
  def verify
    user = User.find_by email: params[:email]

    verified = false

    case params[:strategy].upcase
    when 'TOTP'
      verified = ROTP::TOTP.new(user.otp_secret).verify(params[:otp].to_s)
    when 'HOTP'
      hotp = ROTP::HOTP.new(user.otp_secret)
      verified = hotp.verify(params[:otp].to_s, user.consumed_timestep)
      user.increment_counter(:consumed_timestep, 1)
    end

    render json: { verified: verified } , status: :ok
  end
end
