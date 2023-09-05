class AddOtpDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :otp_secret, :string
    add_column :users, :consumed_timestep, :integer, default: 0
  end
end
