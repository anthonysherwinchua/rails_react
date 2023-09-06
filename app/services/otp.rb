class Otp
  DEFAULT_LENGTH = 6
  INTERVAL = 30

  attr_reader :secret, :integer

  def initialize(secret, integer)
    @secret = secret
    @integer = integer
  end

  def generate
    hash = Digest::MD5.hexdigest combined_string

    hash.hex.to_s[0..(DEFAULT_LENGTH-1)]
  end

  def verify
    time = Time.now.to_i / INTERVAL
    correct_otp = Otp.new(user.otp_secret, time).generate

    generate.to_s == correct_otp
  end

  private

  def combined_string
    combined_string ||= "#{secret}#{integer}"
  end
end
